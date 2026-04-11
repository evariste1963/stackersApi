import { Database } from 'bun:sqlite';

const db = new Database('stackers.db');

export function getUserByUsername(username) {
  return db.prepare('SELECT * FROM users WHERE username = ?').get(username);
}

export function getUserById(id) {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
}

export function createUser(username, email, passwordHash) {
  const stmt = db.prepare('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)');
  const result = stmt.run(username, email, passwordHash);
  return result.lastInsertRowid;
}

export function updateUserGoldApiKey(userId, goldapiKey, goldapiSecret) {
  const stmt = db.prepare('UPDATE users SET goldapi_key = ?, goldapi_secret = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
  return stmt.run(goldapiKey, goldapiSecret, userId);
}

export function updateUserSettings(userId, settings) {
  const stmt = db.prepare(`
    UPDATE users SET 
      default_metal = ?,
      default_currency = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);
  return stmt.run(settings.metal, settings.currency, userId);
}

export function logApiUsage(userId, endpoint, metal, currency) {
  const stmt = db.prepare('INSERT INTO api_usage (user_id, endpoint, metal, currency) VALUES (?, ?, ?, ?)');
  return stmt.run(userId, endpoint, metal, currency);
}

export function userExists(username) {
  const result = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
  return !!result;
}

export function emailExists(email) {
  const result = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  return !!result;
}

export default db;
