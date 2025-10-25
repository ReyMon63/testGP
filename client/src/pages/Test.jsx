import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { testAPI } from '../services/api';
import '../styles/Test.css';

function Test() {
  const navigate = useNavigate();
  const location = useLocation();
  const testData = location.state?.testData;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!testData || !testData.questions) {
      navigate('/');
    }
  }, [testData, navigate]);

  if (!testData) {
    return null;
  }

  const { questions, candidateName, candidateId, testCodeId } = testData;
  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === null) {
      alert('Por favor selecciona una opción');
      return;
    }

    const newAnswers = [
      ...answers,
      {
        questionId: questions[currentQuestion].id,
        pregunta: questions[currentQuestion].pregunta,
        respuesta: selectedOption.texto,
        perfil: selectedOption.perfil
      }
    ];

    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit(newAnswers);
    }
  };

  const handleSubmit = async (finalAnswers) => {
    setLoading(true);

    try {
      const response = await testAPI.submitTest({
        candidateId,
        testCodeId,
        answers: finalAnswers
      });

      navigate('/results', { 
        state: { 
          results: response.data,
          candidateName
        } 
      });
    } catch (err) {
      alert('Error al enviar el test. Por favor intenta nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="test-container">
        <div className="loading-screen">
          <div className="loader"></div>
          <h2>Procesando tus respuestas...</h2>
          <p>Calculando tu perfil de liderazgo</p>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="test-container">
      <div className="test-header">
        <div className="test-header-content">
          <h2>Test DISC - {candidateName}</h2>
          <div className="question-counter">
            Pregunta {currentQuestion + 1} de {totalQuestions}
          </div>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="progress-text">{Math.round(progress)}% completado</div>
      </div>

      <div className="test-content">
        <div className="question-card">
          <div className="question-number">Pregunta {currentQuestion + 1}</div>
          <h3 className="question-text">{question.pregunta}</h3>

          <div className="options-container">
            {question.opciones.map((opcion, index) => (
              <div
                key={index}
                className={`option-card ${selectedOption === opcion ? 'selected' : ''}`}
                onClick={() => handleSelectOption(opcion)}
              >
                <div className="option-radio">
                  {selectedOption === opcion && <div className="option-radio-inner"></div>}
                </div>
                <div className="option-text">{opcion.texto}</div>
              </div>
            ))}
          </div>

          <div className="test-actions">
            <button 
              className="btn btn-primary btn-large"
              onClick={handleNext}
              disabled={selectedOption === null}
            >
              {currentQuestion < totalQuestions - 1 ? 'Siguiente →' : '✓ Finalizar Test'}
            </button>
          </div>

          <div className="test-info">
            <p>💡 Selecciona la opción que mejor describa tu comportamiento natural</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
