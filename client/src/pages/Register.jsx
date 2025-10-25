import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { candidatesAPI } from '../services/api';
import '../styles/Register.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    edad: '',
    email: '',
    puesto: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.apellidos.trim()) {
      newErrors.apellidos = 'Los apellidos son requeridos';
    }

    const edad = parseInt(formData.edad);
    if (!formData.edad || edad < 18 || edad > 100) {
      newErrors.edad = 'La edad debe estar entre 18 y 100 años';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.puesto.trim()) {
      newErrors.puesto = 'El puesto es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await candidatesAPI.register(formData);
      
      if (response.data.success) {
        setSuccess(true);
      }
    } catch (err) {
      setErrors({ 
        submit: err.response?.data?.error || 'Error al registrar. Por favor intenta nuevamente.' 
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="register-container">
        <div className="register-card success-card">
          <div className="success-icon">✅</div>
          <h2>¡Registro Exitoso!</h2>
          <p className="success-message">
            Hemos enviado un código de acceso único a tu correo electrónico:
          </p>
          <p className="email-highlight">{formData.email}</p>
          
          <div className="info-box">
            <h3>⚠️ Instrucciones Importantes:</h3>
            <ul>
              <li>Revisa tu bandeja de entrada (y carpeta de spam)</li>
              <li>El código es de <strong>un solo uso</strong></li>
              <li>Una vez que inicies el test, deberás completarlo</li>
              <li>Tiempo estimado: 15-20 minutos</li>
            </ul>
          </div>

          <button 
            className="btn btn-primary btn-large"
            onClick={() => navigate('/')}
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Volver
        </button>

        <div className="register-header">
          <div className="logo-icon">🎯</div>
          <h1>Registro de Candidato</h1>
          <p>Completa tus datos para recibir el código de acceso al test</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={errors.nombre ? 'error' : ''}
              placeholder="Tu nombre"
            />
            {errors.nombre && <span className="error-text">{errors.nombre}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="apellidos">Apellidos *</label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              className={errors.apellidos ? 'error' : ''}
              placeholder="Tus apellidos"
            />
            {errors.apellidos && <span className="error-text">{errors.apellidos}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="edad">Edad *</label>
            <input
              type="number"
              id="edad"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              className={errors.edad ? 'error' : ''}
              placeholder="Tu edad"
              min="18"
              max="100"
            />
            {errors.edad && <span className="error-text">{errors.edad}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="tu@email.com"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="puesto">Puesto Actual *</label>
            <input
              type="text"
              id="puesto"
              name="puesto"
              value={formData.puesto}
              onChange={handleChange}
              className={errors.puesto ? 'error' : ''}
              placeholder="Ej: Gerente de Ventas"
            />
            {errors.puesto && <span className="error-text">{errors.puesto}</span>}
          </div>

          {errors.submit && (
            <div className="error-box">
              {errors.submit}
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary btn-large"
            disabled={loading}
          >
            {loading ? '⏳ Enviando...' : '📧 Enviar Registro'}
          </button>
        </form>

        <div className="privacy-note">
          <p>
            🔒 Tus datos están protegidos y solo se utilizarán para fines del test.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
