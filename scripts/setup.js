import { Database } from 'bun:sqlite';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config();

const db = new Database('stackers.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    goldapi_key TEXT,
    goldapi_secret TEXT,
    default_metal TEXT DEFAULT 'XAU',
    default_currency TEXT DEFAULT 'GBP',
    is_admin INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS api_usage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    endpoint TEXT NOT NULL,
    metal TEXT,
    currency TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`);

const adminExists = db.prepare('SELECT id FROM users WHERE username = ?').get('thisme');

if (!adminExists) {
  const passwordHash = bcrypt.hashSync('thisme', 12);
  
  db.prepare(`
    INSERT INTO users (username, email, password_hash, goldapi_key, is_admin)
    VALUES (?, ?, ?, ?, ?)
  `).run('thisme', 'thisme@example.com', passwordHash, process.env.GOLDAPI_KEY, 1);
  
  console.log('Admin user "thisme" created with GoldAPI key assigned.');
} else {
  db.prepare('UPDATE users SET goldapi_key = ?, is_admin = 1 WHERE username = ?')
    .run(process.env.GOLDAPI_KEY, 'thisme');
  console.log('Admin user "thisme" updated with GoldAPI key.');
}

console.log('Database initialized successfully.');
console.log('Admin login: username=thisme, password=thisme');

db.close();
