import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { adminAPI } from '../services/api';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import '../styles/Admin.css';

function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [stats, setStats] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stats');

  useEffect(() => {
    // Verificar que viene del código maestro
    if (!location.state?.code) {
      navigate('/');
      return;
    }

    loadData();
  }, [location, navigate]);

  const loadData = async () => {
    try {
      const [statsResponse, resultsResponse] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getResults()
      ]);

      setStats(statsResponse.data);
      setResults(resultsResponse.data);
    } catch (error) {
      console.error('Error cargando datos:', error);
      alert('Error al cargar los datos del administrador');
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      const response = await adminAPI.exportCSV();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `resultados-disc-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exportando CSV:', error);
      alert('Error al exportar los datos');
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading-screen">
          <div className="loader"></div>
          <h2>Cargando panel de administración...</h2>
        </div>
      </div>
    );
  }

  const pieData = [
    { name: 'Dominante', value: stats.profileDistribution.D || 0, color: '#ef4444' },
    { name: 'Influyente', value: stats.profileDistribution.I || 0, color: '#f59e0b' },
    { name: 'Estable', value: stats.profileDistribution.S || 0, color: '#10b981' },
    { name: 'Cumplidor', value: stats.profileDistribution.C || 0, color: '#3b82f6' }
  ];

  const getProfileName = (code) => {
    const names = { D: 'Dominante', I: 'Influyente', S: 'Estable', C: 'Cumplidor' };
    return names[code] || 'N/A';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="admin-header-content">
          <h1>🔐 Panel de Administración</h1>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            ← Salir
          </button>
        </div>
      </div>

      <div className="admin-tabs">
        <button 
          className={`tab ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          📊 Estadísticas
        </button>
        <button 
          className={`tab ${activeTab === 'results' ? 'active' : ''}`}
          onClick={() => setActiveTab('results')}
        >
          📋 Resultados
        </button>
      </div>

      {activeTab === 'stats' && (
        <div className="admin-content">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-value">{stats.totalCandidates}</div>
              <div className="stat-label">Total Candidatos</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-value">{stats.totalTestsCompleted}</div>
              <div className="stat-label">Tests Completados</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏳</div>
              <div className="stat-value">{stats.pendingTests}</div>
              <div className="stat-label">Tests Pendientes</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-value">
                {stats.totalCandidates > 0 
                  ? Math.round((stats.totalTestsCompleted / stats.totalCandidates) * 100) 
                  : 0}%
              </div>
              <div className="stat-label">Tasa de Completado</div>
            </div>
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
                    label={({ name, value }) => value > 0 ? `${name}: ${value}` : ''}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <h3>Promedios de Puntuación</h3>
              <div className="averages-list">
                <div className="average-item">
                  <span className="average-label">Dominancia:</span>
                  <div className="average-bar-container">
                    <div 
                      className="average-bar dominance" 
                      style={{ width: `${(stats.averageScores.dominance / 28) * 100}%` }}
                    ></div>
                  </div>
                  <span className="average-value">{stats.averageScores.dominance}</span>
                </div>
                <div className="average-item">
                  <span className="average-label">Influencia:</span>
                  <div className="average-bar-container">
                    <div 
                      className="average-bar influence" 
                      style={{ width: `${(stats.averageScores.influence / 28) * 100}%` }}
                    ></div>
                  </div>
                  <span className="average-value">{stats.averageScores.influence}</span>
                </div>
                <div className="average-item">
                  <span className="average-label">Estabilidad:</span>
                  <div className="average-bar-container">
                    <div 
                      className="average-bar steadiness" 
                      style={{ width: `${(stats.averageScores.steadiness / 28) * 100}%` }}
                    ></div>
                  </div>
                  <span className="average-value">{stats.averageScores.steadiness}</span>
                </div>
                <div className="average-item">
                  <span className="average-label">Cumplimiento:</span>
                  <div className="average-bar-container">
                    <div 
                      className="average-bar compliance" 
                      style={{ width: `${(stats.averageScores.compliance / 28) * 100}%` }}
                    ></div>
                  </div>
                  <span className="average-value">{stats.averageScores.compliance}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'results' && (
        <div className="admin-content">
          <div className="results-actions">
            <button className="btn btn-primary" onClick={handleExportCSV}>
              📥 Exportar a CSV
            </button>
            <button className="btn btn-secondary" onClick={loadData}>
              🔄 Actualizar
            </button>
          </div>

          <div className="results-table-container">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Edad</th>
                  <th>Puesto</th>
                  <th>Estado</th>
                  <th>Perfil Principal</th>
                  <th>D</th>
                  <th>I</th>
                  <th>S</th>
                  <th>C</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.id}>
                    <td>{result.nombre} {result.apellidos}</td>
                    <td>{result.email}</td>
                    <td>{result.edad}</td>
                    <td>{result.puesto}</td>
                    <td>
                      <span className={`status-badge ${result.testCompleted ? 'completed' : 'pending'}`}>
                        {result.testCompleted ? '✅ Completado' : '⏳ Pendiente'}
                      </span>
                    </td>
                    <td>
                      {result.testCompleted ? (
                        <span className={`profile-badge ${result.primaryProfile.toLowerCase()}`}>
                          {getProfileName(result.primaryProfile)}
                        </span>
                      ) : '-'}
                    </td>
                    <td>{result.testCompleted ? result.scores.D : '-'}</td>
                    <td>{result.testCompleted ? result.scores.I : '-'}</td>
                    <td>{result.testCompleted ? result.scores.S : '-'}</td>
                    <td>{result.testCompleted ? result.scores.C : '-'}</td>
                    <td>{formatDate(result.completedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
