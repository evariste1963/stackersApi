# Setting Up Price Database on New PC

This guide walks you through setting up the prices table in the database when setting up the Stackers API project on a new PC/location.

## Prerequisites

- Bun installed (`curl -fsSL https://bun.sh/install | bash`)
- Node.js not required (Bun handles everything)
- Access to the stackersApi project folder

---

## Step-by-Step Setup

### Step 1: Navigate to Project Folder

```bash
cd /path/to/stackersApi
```

Replace `/path/to/stackersApi` with your actual path to the project.

---

### Step 2: Create the Prices Table

The prices table stores historical金属 prices (gold, silver, etc.). Run this SQL:

```bash
sqlite3 stackers.db "CREATE TABLE IF NOT EXISTS prices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  metal TEXT DEFAULT 'XAU',
  date TEXT NOT NULL,
  price REAL NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(metal, date)
);"
```

**What this does:**
- Creates a `prices` table with columns for metal type, date, and price
- `UNIQUE(metal, date)` prevents duplicate entries for the same metal/date

To verify it worked:

```bash
sqlite3 stackers.db ".tables"
```

You should see: `api_usage  prices  sessions  users`

---

### Step 3: Import Historical Price Data

If you have the old `src/js/priceData.js` file, you can import its data. First, verify the file exists:

```bash
ls src/js/priceData.js
```

If it exists, import the data:

```bash
cat src/js/priceData.js | sed -n '/export const priceData = {/,/};/p' | sed 's/.*"\([0-9-]*\)": *\([0-9.]*\).*/INSERT OR IGNORE INTO prices (metal, date, price) VALUES ('\''XAU'\'', '\''\1'\'', \2);/' | grep "INSERT" | sqlite3 stackers.db
```

**What this does:**
- Parses the `priceData.js` file
- Extracts all date/price pairs
- Inserts them into the `prices` table
- `INSERT OR IGNORE` skips duplicates if any

To verify import:

```bash
sqlite3 stackers.db "SELECT COUNT(*) FROM prices;"
```

Should show around **72** entries.

---

### Step 4: Verify the Database Functions

The backend needs database functions to read/write prices. Verify they're in `src/server/database.js`:

```bash
grep -n "getPricesByMetal\|savePrice" src/server/database.js
```

You should see both functions defined:
- `getPricesByMetal` - fetches all prices for a metal
- `savePrice(metal, date, price)` - saves new fetched prices

---

### Step 5: Verify API Endpoints

The server needs API endpoints for prices. Check `src/server/apiRoutes.js`:

```bash
grep -n "/api/prices" src/server/apiRoutes.js
```

You should see:
- `GET /api/prices` - returns all prices for a metal
- Code in `POST /api/metal-price` that saves fetched prices to database

---

### Step 6: Test the Setup

Start the server:

```bash
bun run server.js
```

Or if using npm:

```bash
npm run dev
```

Then:
1. Open browser to `http://localhost:3000`
2. Login with your account
3. Click "GET LATEST PRICE" button
4. Check browser console for errors

**Verify new price is saved to database:**

```bash
sqlite3 stackers.db "SELECT * FROM prices ORDER BY date DESC LIMIT 3;"
```

You should see today's date with a new price.

---

## Manual Verification Commands

Here are useful commands for checking your setup:

### View all prices (newest first):
```bash
sqlite3 stackers.db "SELECT * FROM prices ORDER BY date DESC;"
```

### View only today's price:
```bash
sqlite3 stackers.db "SELECT * FROM prices WHERE date = '2026-04-13';"
```

### Count total prices:
```bash
sqlite3 stackers.db "SELECT COUNT(*) FROM prices;"
```

### Check table schema:
```bash
sqlite3 stackers.db ".schema prices"
```

### Delete ALL price data (if needed for testing):
```bash
sqlite3 stackers.db "DELETE FROM prices;"
```

---

## Troubleshooting

### "sqlite3: command not found"
Install sqlite3:
```bash
# On Linux (Debian/Ubuntu):
sudo apt install sqlite3

# On Mac:
brew install sqlite3
```

### "Table 'prices' doesn't exist"
Run Step 2 again to create the table.

### Prices not showing in chart
- Check server is running with `bun run server.js`
- Check browser console for errors
- Verify API returns data: `curl http://localhost:3000/api/prices`

### Old prices not importing
Manually add entries:
```bash
sqlite3 stackers.db "INSERT INTO prices (metal, date, price) VALUES ('XAU', '2026-01-02', 3216.56);"
```

---

## What Happens When Fetching Prices

Here's the flow:

1. User clicks "GET LATEST PRICE" button
2. Frontend calls `/api/metal-price`
3. Server fetches live price from GoldAPI
4. Server saves price to database (metal, date, price)
5. Frontend loads chart from `/api/prices`
6. Chart displays all historical + new prices

---

## Notes

- Prices are stored in `stackers.db` SQLite database
- The `prices` table uses `metal TEXT` so you can add silver (XAG) later
- New fetched prices are automatically saved to database
- Old hardcoded `priceData.js` can be deleted after testing

---

## Future: Delete Old File

After everything works on both PCs, you can delete the old file:

```bash
rm src/js/priceData.js
```

But keep the backup until both PCs are working!