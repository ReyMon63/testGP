const nodemailer = require('nodemailer');

// Configuración del transportador de email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Template HTML para el email
const getEmailTemplate = (name, code, testUrl) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 50px auto;
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
        }
        .content {
          padding: 40px 30px;
        }
        .code-box {
          background: #f8f9fa;
          border: 2px dashed #667eea;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          margin: 30px 0;
        }
        .code {
          font-size: 32px;
          font-weight: bold;
          color: #667eea;
          letter-spacing: 2px;
          font-family: 'Courier New', monospace;
        }
        .button {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 15px 40px;
          text-decoration: none;
          border-radius: 50px;
          font-weight: bold;
          margin: 20px 0;
        }
        .footer {
          background: #f8f9fa;
          padding: 20px;
          text-align: center;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 Test DISC de Liderazgo</h1>
        </div>
        <div class="content">
          <h2>Hola ${name},</h2>
          <p>Has sido invitado a realizar el test psicométrico DISC para evaluar tu perfil de liderazgo.</p>
          
          <p><strong>Este es tu código de acceso único:</strong></p>
          <div class="code-box">
            <div class="code">${code}</div>
          </div>
          
          <p><strong>Instrucciones:</strong></p>
          <ul>
            <li>Este código es de un solo uso</li>
            <li>El test consta de 28 preguntas</li>
            <li>Duración aproximada: 15-20 minutos</li>
            <li>Responde de forma honesta y espontánea</li>
          </ul>
          
          <center>
            <a href="${testUrl}" class="button">Iniciar Test</a>
          </center>
          
          <p style="color: #999; font-size: 14px; margin-top: 30px;">
            Si no solicitaste este test, puedes ignorar este correo.
          </p>
        </div>
        <div class="footer">
          <p>© 2025 Test DISC de Liderazgo - Todos los derechos reservados</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Función para enviar email con código
const sendTestCode = async (email, name, code) => {
  const testUrl = process.env.FRONTEND_URL || 'http://localhost:5000';
  
  const mailOptions = {
    from: `"Test DISC Liderazgo" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '🎯 Tu código para el Test DISC de Liderazgo',
    html: getEmailTemplate(name, code, testUrl)
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error al enviar email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendTestCode };
