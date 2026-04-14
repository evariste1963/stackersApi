# Setting Up Stackers API on a New PC

This guide walks you through setting up the Stackers API project on a new PC/location. It includes database setup, price history, and encrypted API key configuration.

---

## Prerequisites

- Bun installed (`curl -fsSL https://bun.sh/install | bash`)
- Node.js not required (Bun handles everything)
- Access to the stackersApi project folder
- Copy of `.env` file from the original PC (contains encryption keys)

---

## Quick Summary

| Step | Action | Notes |
|------|--------|-------|
| 1 | Clone repo | From your GitHub |
| 2 | `bun install` | Installs dependencies including crypto-js |
| 3 | Copy `.env` file | **CRITICAL** - contains ENCRYPTION_KEY |
| 4 | Copy `stackers.db` | Preserves encrypted API keys and price history |
| 5 | `npm start` or `bun run server.js` | Initialize DB + start server |

---

## Step-by-Step Setup

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd stackersApi
```

---

### Step 2: Install Dependencies

```bash
bun install
```

This automatically installs `crypto-js` (for encrypting API keys).

---

### Step 3: Copy the Environment File (CRITICAL)

The `.env` file contains the `ENCRYPTION_KEY` which is required to decrypt user API keys. **Without this, no user can make API calls.**

**Option A: Copy the file directly**
```bash
# From PC1, copy .env to PC2 via USB/network, etc.
```

**Option B: Copy the content manually**
```bash
# On PC1, display the contents:
cat .env

# On PC2, create the file:
nano .env

# Paste this content:
JWT_SECRET=xYPzTxA9W2j5pqOsg+QDKyOZuHbQzB4dJqK/HncYFss=
ENCRYPTION_KEY=539917565b032394bcb14d5598ce6e2aedaa30790e13694d4572c83aaf49ae62
```

**⚠️ IMPORTANT:** Keep `.env` safe - it's already in `.gitignore` so won't be committed.

---

### Step 4: Copy the Database File

The `stackers.db` file contains:
- User accounts (with encrypted API keys)
- Price history data

```bash
# Copy stackers.db from PC1 to PC2 (same location in project folder)
```

This preserves:
- All user accounts and their encrypted GoldAPI keys
- Historical price data (72+ entries)
- API usage logs

---

### Step 5: Verify Setup

Start the server:

```bash
bun run server.js
```

Then:
1. Open browser to `http://localhost:3000`
2. Login with your account
3. Click **GET LATEST PRICE** button
4. Check browser console for errors

**Verify price is saved to database:**

```bash
sqlite3 stackers.db SELECT * FROM prices ORDER BY date DESC LIMIT 3;
```

You should see today's date with a new price.

---

## Manual Setup (If Not Copying Database)

If you prefer to set up fresh instead of copying the database:

### Create Prices Table

```bash
sqlite3 stackers.db CREATE TABLE IF NOT EXISTS prices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  metal TEXT DEFAULT 'XAU',
  date TEXT NOT NULL,
  price REAL NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(metal, date)
);
```

### Import Historical Price Data

If you have the old `src/js/priceData.js` file:

```bash
cat src/js/priceData.js | sed -n '/export const priceData = {/,/};/p' | sed 's/.*\"\\(.*\\)\": *\\(.*\\).*/INSERT OR IGNORE INTO prices (metal, date, price) VALUES ('\\'XAU'\\', '\\'\\1'\\', \\2);/' | grep INSERT | sqlite3 stackers.db
```

### Verify Price Count

```bash
sqlite3 stackers.db SELECT COUNT(*) FROM prices;
```

Should show around **72** entries.

---

## API Key Encryption

### How It Works

User API keys are encrypted in the database:

| Field | Storage | When Decrypted |
|-------|---------|----------------|
| goldapi_key | Encrypted (AES) | Only when making API call to GoldAPI |

### Encryption Key

The `ENCRYPTION_KEY` in `.env` is used to:
- Encrypt keys when users save them in Settings
- Decrypt keys when making requests to GoldAPI

**If you lose the ENCRYPTION_KEY:** All stored API keys become unrecoverable. Users will need to re-enter their keys.

### Verify Encryption is Working

```bash
# View encrypted key in database (should look like: U2FsdGVkX1...)
sqlite3 stackers.db SELECT goldapi_key FROM users WHERE id = 1;

# Test decryption works
curl http://localhost:3000/api/prices
# Should work without errors
```

---

## Manual Verification Commands

### Check tables exist:
```bash
sqlite3 stackers.db .tables
```

### View recent prices:
```bash
sqlite3 stackers.db SELECT * FROM prices ORDER BY date DESC LIMIT 5;
```

### Count price entries:
```bash
sqlite3 stackers.db SELECT COUNT(*) FROM prices;
```

### View users with API keys:
```bash
sqlite3 stackers.db SELECT id, username, goldapi_key FROM users WHERE goldapi_key IS NOT NULL;
```

### Check table schema:
```bash
sqlite3 stackers.db .schema prices
```

---

## Troubleshooting

### Error: ENCRYPTION_KEY not set

Make sure `.env` file exists and contains:
```
ENCRYPTION_KEY=539917565b032394bcb14d5598ce6e2aedaa30790e13694d4572c83aaf49ae62
```

### Error: Invalid API Key (403)

- Check the user has a valid GoldAPI key saved in Settings
- Verify `.env` has the correct ENCRYPTION_KEY
- Try re-saving the API key in Settings

### Prices not showing in chart

- Check server is running: `bun run server.js`
- Check browser console for errors
- Verify API returns data: `curl http://localhost:3000/api/prices`

### sqlite3: command not found

```bash
# On Linux (Debian/Ubuntu):
sudo apt install sqlite3

# On Mac:
brew install sqlite3
```

---

## Understanding the System

### Data Flow

1. **User saves API key** → Encrypted with ENCRYPTION_KEY → Stored in database
2. **User clicks GET LATEST PRICE** → Key decrypted → Sent to GoldAPI → Price returned
3. **Price saved** → Stored in prices table → Displayed in chart

### Security

- API keys are encrypted at rest in the database
- Only decrypted in memory when making API calls
- The ENCRYPTION_KEY in `.env` is the secret - keep it safe!

---

## Notes

- Prices stored in `stackers.db` SQLite database
- `prices` table supports multiple metals (XAU, XAG, etc.)
- New fetched prices automatically saved to database
- User API keys encrypted - requires ENCRYPTION_KEY to work
- Database file can be copied between PCs to transfer all data

---

## Future Maintenance

### Delete Old priceData.js

After everything works on both PCs:

```bash
rm src/js/priceData.js
```

### Migrate New Users

When users create accounts, they enter their API key in Settings. It will be automatically encrypted before storing.

### Backup the Database

Regularly backup `stackers.db` to preserve:
- All user accounts
- Encrypted API keys
- Price history
- API usage logs

---

## Automated Setup (Recommended for Deployment)

The project includes an automated database initialization script that creates all required tables if they don't exist.

### Using the Setup Script

```bash
# Initialize database and start server
npm start

# Or just initialize database
npm run initdb
```

This will:
1. Create all database tables (users, prices, api_usage, sessions)
2. Verify prices table has data
3. Start the server

### Manual Database Setup

If you prefer to set up manually or need to fix issues:

```bash
# Run the initialization script directly
bun run scripts/init-db.js
```

### What the Script Does

The `scripts/init-db.js` script:
- Creates `users` table if not exists
- Creates `prices` table if not exists
- Creates `api_usage` table if not exists
- Creates `sessions` table if not exists
- Checks if prices table has data
- Reports status

This ensures the database is properly set up on first run or after a fresh clone.