import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import '../styles/Results.css';

function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const { results, candidateName } = location.state || {};

  useEffect(() => {
    if (!results) {
      navigate('/');
    }
  }, [results, navigate]);

  if (!results) {
    return null;
  }

  const { scores, primaryProfile, primaryProfileCode } = results;

  // Datos para las gráficas
  const pieData = [
    { name: 'Dominancia', value: scores.dominance, color: '#ef4444' },
    { name: 'Influencia', value: scores.influence, color: '#f59e0b' },
    { name: 'Estabilidad', value: scores.steadiness, color: '#10b981' },
    { name: 'Cumplimiento', value: scores.compliance, color: '#3b82f6' }
  ];

  const barData = [
    { perfil: 'D', puntuacion: scores.dominance, fill: '#ef4444' },
    { perfil: 'I', puntuacion: scores.influence, fill: '#f59e0b' },
    { perfil: 'S', puntuacion: scores.steadiness, fill: '#10b981' },
    { perfil: 'C', puntuacion: scores.compliance, fill: '#3b82f6' }
  ];

  const profileDescriptions = {
    D: {
      title: 'Dominante',
      icon: '🎯',
      description: 'Eres directo, decidido y orientado a resultados. Te motivan los desafíos y tomar el control de las situaciones.',
      strengths: [
        'Toma decisiones rápidas y efectivas',
        'Orientado a resultados y logros',
        'Enfrenta desafíos con confianza',
        'Líder natural en situaciones difíciles'
      ],
      improvements: [
        'Practica la paciencia con otros',
        'Escucha más antes de decidir',
        'Considera las emociones de tu equipo',
        'Delega con mayor confianza'
      ]
    },
    I: {
      title: 'Influyente',
      icon: '🌟',
      description: 'Eres sociable, entusiasta y persuasivo. Te motiva el reconocimiento y crear relaciones positivas con otros.',
      strengths: [
        'Excelente comunicador y motivador',
        'Crea ambientes positivos y energéticos',
        'Inspira y persuade a otros',
        'Networking natural y relaciones fuertes'
      ],
      improvements: [
        'Enfócate más en los detalles',
        'Cumple los deadlines consistentemente',
        'Estructura mejor tus tareas',
        'Profundiza en el análisis antes de decidir'
      ]
    },
    S: {
      title: 'Estable',
      icon: '🤝',
      description: 'Eres paciente, leal y colaborador. Te motiva la estabilidad, la armonía y ayudar a otros en un ambiente predecible.',
      strengths: [
        'Confiable y consistente',
        'Excelente trabajo en equipo',
        'Paciente y buen escuchador',
        'Crea ambientes armoniosos'
      ],
      improvements: [
        'Sé más asertivo cuando sea necesario',
        'Acepta los cambios con más flexibilidad',
        'Expresa tus opiniones más abiertamente',
        'Toma más riesgos calculados'
      ]
    },
    C: {
      title: 'Cumplidor',
      icon: '📊',
      description: 'Eres preciso, analítico y sistemático. Te motiva la exactitud, la calidad y hacer las cosas correctamente.',
      strengths: [
        'Atención excepcional al detalle',
        'Análisis profundo y pensamiento crítico',
        'Altos estándares de calidad',
        'Organizado y metódico'
      ],
      improvements: [
        'Sé más flexible con los estándares',
        'Toma decisiones más rápidas',
        'Acepta que la perfección no siempre es posible',
        'Socializa más con el equipo'
      ]
    }
  };

  const profile = profileDescriptions[primaryProfileCode];

  return (
    <div className="results-container">
      <div className="results-header">
        <div className="results-icon">🎉</div>
        <h1>¡Test Completado!</h1>
        <p className="results-candidate">{candidateName}</p>
      </div>

      <div className="results-content">
        <div className="primary-profile-card">
          <div className="profile-icon">{profile.icon}</div>
          <h2>Tu Perfil Principal: {profile.title}</h2>
          <p className="profile-description">{profile.description}</p>
        </div>

        <div className="charts-section">
          <div className="chart-card">
            <h3>Distribución de Perfiles</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Puntuación por Perfil</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="perfil" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="puntuacion" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="profile-details">
          <div className="details-card strengths">
            <h3>💪 Fortalezas Clave</h3>
            <ul>
              {profile.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>

          <div className="details-card improvements">
            <h3>🎯 Áreas de Desarrollo</h3>
            <ul>
              {profile.improvements.map((improvement, index) => (
                <li key={index}>{improvement}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="scores-summary">
          <h3>Resumen de Puntuaciones</h3>
          <div className="scores-grid">
            <div className="score-item dominance">
              <div className="score-label">Dominancia</div>
              <div className="score-value">{scores.dominance}</div>
            </div>
            <div className="score-item influence">
              <div className="score-label">Influencia</div>
              <div className="score-value">{scores.influence}</div>
            </div>
            <div className="score-item steadiness">
              <div className="score-label">Estabilidad</div>
              <div className="score-value">{scores.steadiness}</div>
            </div>
            <div className="score-item compliance">
              <div className="score-label">Cumplimiento</div>
              <div className="score-value">{scores.compliance}</div>
            </div>
          </div>
        </div>

        <div className="results-actions">
          <button 
            className="btn btn-primary btn-large"
            onClick={() => window.print()}
          >
            🖨️ Imprimir Resultados
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            Volver al Inicio
          </button>
        </div>
      </div>

      <div className="results-footer">
        <p>Gracias por completar el Test DISC. Estos resultados son confidenciales.</p>
      </div>
    </div>
  );
}

export default Results;
