const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Configuración de la base de datos SQLite
const dbPath = process.env.DATABASE_URL || path.join(__dirname, '../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite');
  }
});

// Crear tablas si no existen
db.serialize(() => {
  // Tabla de candidatos CON LOS CAMPOS CORRECTOS
  db.run(`
    CREATE TABLE IF NOT EXISTS candidates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      apellidos TEXT NOT NULL,
      edad INTEGER NOT NULL,
      email TEXT UNIQUE NOT NULL,
      puesto TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabla de códigos de verificación
  db.run(`
    CREATE TABLE IF NOT EXISTS test_codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      candidate_id INTEGER NOT NULL,
      code TEXT UNIQUE NOT NULL,
      used INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (candidate_id) REFERENCES candidates (id)
    )
  `);

  // Tabla de respuestas del test
  db.run(`
    CREATE TABLE IF NOT EXISTS test_responses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      candidate_id INTEGER NOT NULL,
      question_id INTEGER NOT NULL,
      answer_most TEXT NOT NULL,
      answer_least TEXT NOT NULL,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (candidate_id) REFERENCES candidates (id)
    )
  `);

  // Tabla de resultados DISC
  db.run(`
    CREATE TABLE IF NOT EXISTS disc_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      candidate_id INTEGER UNIQUE NOT NULL,
      d_score INTEGER DEFAULT 0,
      i_score INTEGER DEFAULT 0,
      s_score INTEGER DEFAULT 0,
      c_score INTEGER DEFAULT 0,
      primary_trait TEXT,
      secondary_trait TEXT,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (candidate_id) REFERENCES candidates (id)
    )
  `);
});

module.exports = db;
