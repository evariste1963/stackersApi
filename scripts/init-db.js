import { Database } from 'bun:sqlite';
import { config } from 'dotenv';

config();

const db = new Database('stackers.db');

console.log('Initializing database...');

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
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS prices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    metal TEXT DEFAULT 'XAU',
    date TEXT NOT NULL,
    price REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(metal, date)
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS api_usage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    endpoint TEXT NOT NULL,
    metal TEXT,
    currency TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

console.log('Database tables verified/created:');
console.log('  - users');
console.log('  - prices');
console.log('  - api_usage');
console.log('  - sessions');

// Check if prices table is empty
const priceCount = db.prepare('SELECT COUNT(*) as count FROM prices').get();
if (priceCount.count === 0) {
  console.log('\nNo price data found. Run manual import if needed:');
  console.log('  cat src/js/priceData.js | sed -n ... | sqlite3 stackers.db');
} else {
  console.log(`\nPrices table has ${priceCount.count} entries.`);
}

console.log('\nDatabase initialization complete!');