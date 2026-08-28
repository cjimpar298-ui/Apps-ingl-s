import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Ensure data directory exists for cloud persistence
const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DEFAULT_DATA_FILE = path.join(DATA_DIR, 'agenda-cloud-data.json');

// In-memory cache with fallback file storage
let inMemoryData: any = null;
let lastUpdatedAt: number = Date.now();

// Load existing data from disk on startup if present
if (fs.existsSync(DEFAULT_DATA_FILE)) {
  try {
    const raw = fs.readFileSync(DEFAULT_DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    inMemoryData = parsed.data;
    lastUpdatedAt = parsed.updatedAt || Date.now();
  } catch (err) {
    console.error('Failed to load initial data file:', err);
  }
}

// -------------------------------------------------------------
// Cloud Sync API Endpoints
// -------------------------------------------------------------

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Get current agenda state
app.get('/api/cloud-data', (req, res) => {
  res.json({
    success: true,
    data: inMemoryData,
    updatedAt: lastUpdatedAt,
  });
});

// Save agenda state
app.post('/api/cloud-data', (req, res) => {
  try {
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({ error: 'No data provided' });
    }

    inMemoryData = data;
    lastUpdatedAt = Date.now();

    // Persist to disk asynchronously
    fs.writeFile(
      DEFAULT_DATA_FILE,
      JSON.stringify({ data: inMemoryData, updatedAt: lastUpdatedAt }, null, 2),
      (err) => {
        if (err) console.error('Error persisting cloud data to disk:', err);
      }
    );

    res.json({
      success: true,
      updatedAt: lastUpdatedAt,
    });
  } catch (error: any) {
    console.error('Error saving cloud data:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Support custom room / class session IDs if needed
app.get('/api/cloud-data/:roomId', (req, res) => {
  const roomId = req.params.roomId.replace(/[^a-zA-Z0-9_-]/g, '');
  const roomFile = path.join(DATA_DIR, `agenda-${roomId}.json`);

  if (fs.existsSync(roomFile)) {
    try {
      const raw = fs.readFileSync(roomFile, 'utf-8');
      const parsed = JSON.parse(raw);
      return res.json({ success: true, data: parsed.data, updatedAt: parsed.updatedAt });
    } catch (e) {
      return res.status(500).json({ error: 'Error reading room data' });
    }
  }

  res.json({ success: true, data: null, updatedAt: 0 });
});

app.post('/api/cloud-data/:roomId', (req, res) => {
  const roomId = req.params.roomId.replace(/[^a-zA-Z0-9_-]/g, '');
  const roomFile = path.join(DATA_DIR, `agenda-${roomId}.json`);
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ error: 'No data provided' });
  }

  const now = Date.now();
  fs.writeFile(roomFile, JSON.stringify({ data, updatedAt: now }, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error saving room data' });
    }
    res.json({ success: true, updatedAt: now });
  });
});

// -------------------------------------------------------------
// Vite Server Integration / SPA Fallback
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Cloud-synchronized Agenda server running on port ${PORT}`);
  });
}

startServer();
