import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { testAPI } from '../services/api';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    navigate('/register');
  };

  const handleStart = async () => {
    if (!code.trim()) {
      setError('Por favor ingresa tu código de acceso');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await testAPI.verifyCode(code.trim());
      
      if (response.data.isAdmin) {
        // Redirigir al panel de administración
        navigate('/admin', { state: { code: code.trim() } });
      } else {
        // Redirigir al test con los datos del candidato
        navigate('/test', { 
          state: { 
            testData: response.data 
          } 
        });
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error al verificar el código');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleStart();
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-header">
          <div className="logo-container">
            <div className="logo-icon">🎯</div>
          </div>
          <h1 className="home-title">Mi Perfil de Liderazgo</h1>
          <p className="home-subtitle">Test Psicométrico DISC</p>
        </div>

        <div className="home-description">
          <p>
            Descubre tu estilo de liderazgo y comportamiento mediante el test DISC,
            una herramienta reconocida mundialmente para el desarrollo profesional.
          </p>
        </div>

        <div className="home-actions">
          <button 
            className="btn btn-primary btn-large"
            onClick={handleRegister}
          >
            📝 Registrarme
          </button>

          <div className="divider">
            <span>o</span>
          </div>

          <div className="start-section">
            <p className="start-label">¿Ya tienes un código?</p>
            <input
              type="text"
              className="code-input"
              placeholder="Ingresa tu código"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyPress={handleKeyPress}
              maxLength={20}
            />
            {error && <p className="error-message">{error}</p>}
            <button 
              className="btn btn-secondary btn-large"
              onClick={handleStart}
              disabled={loading}
            >
              {loading ? '⏳ Verificando...' : '🚀 Iniciar Test'}
            </button>
          </div>
        </div>

        <div className="home-info">
          <div className="info-card">
            <div className="info-icon">⏱️</div>
            <h3>15-20 minutos</h3>
            <p>Tiempo estimado</p>
          </div>
          <div className="info-card">
            <div className="info-icon">📊</div>
            <h3>28 preguntas</h3>
            <p>Evaluación completa</p>
          </div>
          <div className="info-card">
            <div className="info-icon">✅</div>
            <h3>Resultados inmediatos</h3>
            <p>Al finalizar</p>
          </div>
        </div>

        <div className="home-profiles">
          <h2>Los 4 Perfiles DISC</h2>
          <div className="profiles-grid">
            <div className="profile-card dominance">
              <div className="profile-letter">D</div>
              <h3>Dominante</h3>
              <p>Directo, decidido, orientado a resultados</p>
            </div>
            <div className="profile-card influence">
              <div className="profile-letter">I</div>
              <h3>Influyente</h3>
              <p>Sociable, entusiasta, persuasivo</p>
            </div>
            <div className="profile-card steadiness">
              <div className="profile-letter">S</div>
              <h3>Estable</h3>
              <p>Paciente, leal, colaborador</p>
            </div>
            <div className="profile-card compliance">
              <div className="profile-letter">C</div>
              <h3>Cumplidor</h3>
              <p>Preciso, analítico, sistemático</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="home-footer">
        <p>© 2025 Mi Perfil de Liderazgo | Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default Home;
