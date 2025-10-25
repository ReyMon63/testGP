const express = require('express');
const router = express.Router();
const db = require('../config/database');
const discQuestions = require('../data/questions');
const { shuffleArray } = require('../utils/helpers');

/**
 * POST /api/test/verify-code
 * Verificar código de acceso y obtener preguntas
 */
router.post('/verify-code', (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Código requerido' });
  }

  // Verificar si es el código maestro
  if (code === process.env.MASTER_CODE) {
    return res.json({
      isAdmin: true,
      message: 'Acceso de administrador concedido'
    });
  }

  // Buscar código en la base de datos
  db.get(
    `SELECT tc.id, tc.candidate_id, tc.used, c.nombre, c.apellidos 
     FROM test_codes tc
     JOIN candidates c ON tc.candidate_id = c.id
     WHERE tc.code = ?`,
    [code],
    (err, testCode) => {
      if (err) {
        console.error('Error verificando código:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
      }

      if (!testCode) {
        return res.status(404).json({ error: 'Código inválido' });
      }

      if (testCode.used) {
        return res.status(403).json({ 
          error: 'Este código ya fue utilizado. No puedes realizar el test nuevamente.' 
        });
      }

      // Marcar código como usado
      db.run(
        'UPDATE test_codes SET used = 1, used_at = CURRENT_TIMESTAMP WHERE id = ?',
        [testCode.id],
        (err) => {
          if (err) {
            console.error('Error actualizando código:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
          }

          // Seleccionar 28 preguntas aleatorias del pool de 60
          const selectedQuestions = shuffleArray([...discQuestions]).slice(0, 28);

          res.json({
            isAdmin: false,
            testCodeId: testCode.id,
            candidateId: testCode.candidate_id,
            candidateName: `${testCode.nombre} ${testCode.apellidos}`,
            questions: selectedQuestions,
            totalQuestions: selectedQuestions.length
          });
        }
      );
    }
  );
});

/**
 * POST /api/test/submit
 * Enviar respuestas del test y calcular resultados
 */
router.post('/submit', (req, res) => {
  const { candidateId, testCodeId, answers } = req.body;

  if (!candidateId || !testCodeId || !answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  // Calcular puntuaciones DISC
  const scores = {
    D: 0, // Dominancia
    I: 0, // Influencia
    S: 0, // Estabilidad (Steadiness)
    C: 0  // Cumplimiento (Compliance)
  };

  answers.forEach(answer => {
    if (scores.hasOwnProperty(answer.perfil)) {
      scores[answer.perfil]++;
    }
  });

  // Determinar perfil primario
  const primaryProfile = Object.keys(scores).reduce((a, b) => 
    scores[a] > scores[b] ? a : b
  );

  const profileNames = {
    D: 'Dominante',
    I: 'Influyente',
    S: 'Estable',
    C: 'Cumplidor'
  };

  // Guardar resultados en la base de datos
  db.run(
    `INSERT INTO test_results 
     (candidate_id, code_id, dominance_score, influence_score, steadiness_score, compliance_score, primary_profile, answers)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      candidateId,
      testCodeId,
      scores.D,
      scores.I,
      scores.S,
      scores.C,
      primaryProfile,
      JSON.stringify(answers)
    ],
    function(err) {
      if (err) {
        console.error('Error guardando resultados:', err);
        return res.status(500).json({ error: 'Error al guardar resultados' });
      }

      res.json({
        success: true,
        resultId: this.lastID,
        scores: {
          dominance: scores.D,
          influence: scores.I,
          steadiness: scores.S,
          compliance: scores.C
        },
        primaryProfile: profileNames[primaryProfile],
        primaryProfileCode: primaryProfile,
        message: '¡Test completado exitosamente!'
      });
    }
  );
});

/**
 * GET /api/test/result/:candidateId
 * Obtener resultados de un candidato
 */
router.get('/result/:candidateId', (req, res) => {
  const { candidateId } = req.params;

  db.get(
    `SELECT 
      c.nombre, c.apellidos, c.edad, c.email, c.puesto,
      tr.dominance_score, tr.influence_score, tr.steadiness_score, tr.compliance_score,
      tr.primary_profile, tr.completed_at
     FROM test_results tr
     JOIN candidates c ON tr.candidate_id = c.id
     WHERE tr.candidate_id = ?`,
    [candidateId],
    (err, result) => {
      if (err) {
        console.error('Error obteniendo resultado:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
      }

      if (!result) {
        return res.status(404).json({ error: 'Resultado no encontrado' });
      }

      res.json(result);
    }
  );
});

module.exports = router;
