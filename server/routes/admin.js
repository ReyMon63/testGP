const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { Parser } = require('json2csv');

/**
 * GET /api/admin/stats
 * Obtener estadísticas generales
 */
router.get('/stats', (req, res) => {
  const stats = {};

  // Total de candidatos registrados
  db.get('SELECT COUNT(*) as total FROM candidates', (err, row) => {
    if (err) {
      console.error('Error obteniendo estadísticas:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
    stats.totalCandidates = row.total;

    // Total de tests completados
    db.get('SELECT COUNT(*) as total FROM test_results', (err, row) => {
      if (err) {
        console.error('Error obteniendo estadísticas:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
      }
      stats.totalTestsCompleted = row.total;

      // Tests pendientes (códigos generados pero no usados)
      db.get('SELECT COUNT(*) as total FROM test_codes WHERE used = 0', (err, row) => {
        if (err) {
          console.error('Error obteniendo estadísticas:', err);
          return res.status(500).json({ error: 'Error en el servidor' });
        }
        stats.pendingTests = row.total;

        // Promedios de cada perfil
        db.get(
          `SELECT 
            AVG(dominance_score) as avgD,
            AVG(influence_score) as avgI,
            AVG(steadiness_score) as avgS,
            AVG(compliance_score) as avgC
           FROM test_results`,
          (err, row) => {
            if (err) {
              console.error('Error obteniendo promedios:', err);
              return res.status(500).json({ error: 'Error en el servidor' });
            }

            stats.averageScores = {
              dominance: Math.round(row.avgD * 10) / 10 || 0,
              influence: Math.round(row.avgI * 10) / 10 || 0,
              steadiness: Math.round(row.avgS * 10) / 10 || 0,
              compliance: Math.round(row.avgC * 10) / 10 || 0
            };

            // Distribución de perfiles primarios
            db.all(
              `SELECT primary_profile, COUNT(*) as count 
               FROM test_results 
               GROUP BY primary_profile`,
              (err, rows) => {
                if (err) {
                  console.error('Error obteniendo distribución:', err);
                  return res.status(500).json({ error: 'Error en el servidor' });
                }

                stats.profileDistribution = rows.reduce((acc, row) => {
                  acc[row.primary_profile] = row.count;
                  return acc;
                }, { D: 0, I: 0, S: 0, C: 0 });

                res.json(stats);
              }
            );
          }
        );
      });
    });
  });
});

/**
 * GET /api/admin/results
 * Obtener todos los resultados para la tabla
 */
router.get('/results', (req, res) => {
  db.all(
    `SELECT 
      c.id,
      c.nombre,
      c.apellidos,
      c.edad,
      c.email,
      c.puesto,
      tr.dominance_score,
      tr.influence_score,
      tr.steadiness_score,
      tr.compliance_score,
      tr.primary_profile,
      tr.completed_at
     FROM candidates c
     LEFT JOIN test_results tr ON c.id = tr.candidate_id
     ORDER BY c.created_at DESC`,
    (err, rows) => {
      if (err) {
        console.error('Error obteniendo resultados:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
      }

      const results = rows.map(row => ({
        id: row.id,
        nombre: row.nombre,
        apellidos: row.apellidos,
        edad: row.edad,
        email: row.email,
        puesto: row.puesto,
        testCompleted: row.dominance_score !== null,
        scores: row.dominance_score !== null ? {
          D: row.dominance_score,
          I: row.influence_score,
          S: row.steadiness_score,
          C: row.compliance_score
        } : null,
        primaryProfile: row.primary_profile,
        completedAt: row.completed_at
      }));

      res.json(results);
    }
  );
});

/**
 * GET /api/admin/export-csv
 * Exportar resultados a CSV
 */
router.get('/export-csv', (req, res) => {
  db.all(
    `SELECT 
      c.nombre,
      c.apellidos,
      c.edad,
      c.email,
      c.puesto,
      tr.dominance_score as 'Dominancia',
      tr.influence_score as 'Influencia',
      tr.steadiness_score as 'Estabilidad',
      tr.compliance_score as 'Cumplimiento',
      CASE tr.primary_profile
        WHEN 'D' THEN 'Dominante'
        WHEN 'I' THEN 'Influyente'
        WHEN 'S' THEN 'Estable'
        WHEN 'C' THEN 'Cumplidor'
        ELSE 'N/A'
      END as 'Perfil_Principal',
      tr.completed_at as 'Fecha_Completado',
      c.created_at as 'Fecha_Registro'
     FROM candidates c
     LEFT JOIN test_results tr ON c.id = tr.candidate_id
     ORDER BY c.created_at DESC`,
    (err, rows) => {
      if (err) {
        console.error('Error exportando CSV:', err);
        return res.status(500).json({ error: 'Error al exportar datos' });
      }

      // Formatear los datos para CSV
      const formattedData = rows.map(row => ({
        Nombre: row.nombre,
        Apellidos: row.apellidos,
        Edad: row.edad,
        Email: row.email,
        Puesto: row.puesto,
        'Test Completado': row.Dominancia !== null ? 'Sí' : 'No',
        Dominancia: row.Dominancia || 'N/A',
        Influencia: row.Influencia || 'N/A',
        Estabilidad: row.Estabilidad || 'N/A',
        Cumplimiento: row.Cumplimiento || 'N/A',
        'Perfil Principal': row.Perfil_Principal,
        'Fecha Completado': row.Fecha_Completado || 'N/A',
        'Fecha Registro': row.Fecha_Registro
      }));

      try {
        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(formattedData);

        // Configurar headers para descarga
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename=resultados-disc-${Date.now()}.csv`);
        
        // Agregar BOM para que Excel reconozca UTF-8
        res.write('\ufeff');
        res.send(csv);
      } catch (error) {
        console.error('Error generando CSV:', error);
        res.status(500).json({ error: 'Error al generar CSV' });
      }
    }
  );
});

/**
 * GET /api/admin/recent-activity
 * Obtener actividad reciente
 */
router.get('/recent-activity', (req, res) => {
  db.all(
    `SELECT 
      c.nombre,
      c.apellidos,
      c.email,
      tr.completed_at,
      tr.primary_profile
     FROM test_results tr
     JOIN candidates c ON tr.candidate_id = c.id
     ORDER BY tr.completed_at DESC
     LIMIT 10`,
    (err, rows) => {
      if (err) {
        console.error('Error obteniendo actividad reciente:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
      }

      res.json(rows);
    }
  );
});

module.exports = router;
