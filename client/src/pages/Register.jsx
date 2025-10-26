import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

function Register() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/candidates/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: nombre,
          email: email,
          phone: telefono
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Registro exitoso. Revisa tu correo para obtener el código de acceso.');
        setTimeout(() => {
          navigate('/test');
        }, 3000);
      } else {
        setMessage(`❌ ${data.error || 'Error al registrar candidato'}`);
      }
    } catch (error) {
      setMessage('❌ Error al conectar con el servidor');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1>📋 Registro de Candidato</h1>
          <p>Ingresa tus datos para recibir tu código de acceso</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo *</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Juan Pérez García"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico *</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu.correo@ejemplo.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="+52 123 456 7890"
              disabled={loading}
            />
          </div>

          {message && (
            <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? '⏳ Registrando...' : '🚀 Registrarme'}
          </button>
        </form>

        <div className="register-footer">
          <p>¿Ya tienes un código? <a href="/test">Iniciar Test</a></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
