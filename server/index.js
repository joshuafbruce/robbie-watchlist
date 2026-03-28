const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// This reads the database URL from an environment variable Railway will provide
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Create the table if it doesn't exist yet
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS watched_items (
      title TEXT PRIMARY KEY,
      watched BOOLEAN NOT NULL DEFAULT false,
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `);
  console.log("DB ready");
}

// GET /api/watched -- returns all watched statuses
app.get("/api/watched", async (req, res) => {
  try {
    const result = await pool.query("SELECT title, watched FROM watched_items");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

// POST /api/watched/:title -- toggles watched for one movie
app.post("/api/watched/:title", async (req, res) => {
  const { title } = req.params;
  const { watched } = req.body;
  try {
    await pool.query(`
      INSERT INTO watched_items (title, watched)
      VALUES ($1, $2)
      ON CONFLICT (title) DO UPDATE SET watched = $2, updated_at = NOW()
    `, [title, watched]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  await initDB();
  console.log(`API running on port ${PORT}`);
});