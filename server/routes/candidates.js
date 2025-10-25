const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { sendVerificationCode } = require('../config/email');
const { generateSecureCode } = require('../utils/helpers');

/**
 * POST /api/candidates/register
 * Registrar nuevo candidato y enviar código de verificación
 */
router.post('/register', async (req, res) => {
  const { nombre, apellidos, edad, email, puesto } = req.body;

  // Validaciones
  if (!nombre || !apellidos || !edad || !email || !puesto) {
    return res.status(400).json({ 
      error: 'Todos los campos son requeridos' 
    });
  }

  if (edad < 18 || edad > 100) {
    return res.status(400).json({ 
      error: 'La edad debe estar entre 18 y 100 años' 
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      error: 'Email inválido' 
    });
  }

  try {
    // Verificar si el email ya existe
    db.get('SELECT id FROM candidates WHERE email = ?', [email], async (err, existingCandidate) => {
      if (err) {
        console.error('Error consultando candidato:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
      }

      if (existingCandidate) {
        return res.status(400).json({ 
          error: 'Este email ya está registrado. Si ya realizaste el test, no puedes repetirlo.' 
        });
      }

      // Insertar nuevo candidato
      db.run(
        'INSERT INTO candidates (nombre, apellidos, edad, email, puesto) VALUES (?, ?, ?, ?, ?)',
        [nombre, apellidos, edad, email, puesto],
        async function(err) {
          if (err) {
            console.error('Error insertando candidato:', err);
            return res.status(500).json({ error: 'Error al registrar candidato' });
          }

          const candidateId = this.lastID;

          // Generar código de verificación
          const code = generateSecureCode();

          // Guardar código en la base de datos
          db.run(
            'INSERT INTO test_codes (candidate_id, code) VALUES (?, ?)',
            [candidateId, code],
            async function(err) {
              if (err) {
                console.error('Error insertando código:', err);
                return res.status(500).json({ error: 'Error al generar código' });
              }

              // Enviar email con el código
              try {
                await sendVerificationCode(email, nombre, code);
                
                res.json({ 
                  success: true,
                  message: 'Registro exitoso. Revisa tu email para obtener el código de acceso.',
                  candidateId: candidateId
                });
              } catch (emailError) {
                console.error('Error enviando email:', emailError);
                
                // Si falla el email, devolver el código en la respuesta (solo para desarrollo)
                if (process.env.NODE_ENV === 'development') {
                  res.json({
                    success: true,
                    message: 'Registro exitoso. (Error al enviar email - modo desarrollo)',
                    code: code, // Solo en desarrollo
                    candidateId: candidateId
                  });
                } else {
                  res.status(500).json({ 
                    error: 'Error al enviar el email. Por favor contacta al administrador.' 
                  });
                }
              }
            }
          );
        }
      );
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
