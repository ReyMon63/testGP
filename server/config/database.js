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
  // Tabla de candidatos
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
      used_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (candidate_id) REFERENCES candidates (id)
    )
  `);

  // Tabla de resultados del test
  db.run(`
    CREATE TABLE IF NOT EXISTS test_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      candidate_id INTEGER UNIQUE NOT NULL,
      code_id INTEGER NOT NULL,
      dominance_score INTEGER DEFAULT 0,
      influence_score INTEGER DEFAULT 0,
      steadiness_score INTEGER DEFAULT 0,
      compliance_score INTEGER DEFAULT 0,
      primary_profile TEXT,
      answers TEXT,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (candidate_id) REFERENCES candidates (id),
      FOREIGN KEY (code_id) REFERENCES test_codes (id)
    )
  `);
});

module.exports = db;
