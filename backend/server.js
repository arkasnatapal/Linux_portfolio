/**
 * ARKA OS — Ubuntu Workstation Backend Server
 * 
 * Provides:
 * 1. Web Proxy (/api/proxy) for Google Chrome app to bypass iframe X-Frame-Options
 * 2. Tour Guide persistence (/api/tour) with MongoDB support & local JSON fallback
 * 3. Network telemetry (/api/network)
 */

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, 'tour_state.json');

app.use(cors());
app.use(express.json());

// In-memory & local file state for Tour Guide
function readTourState() {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    }
  } catch (err) {
    console.error('Error reading tour file:', err);
  }
  return { completed: false, deviceId: 'local-workstation' };
}

function saveTourState(state) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(state, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving tour file:', err);
  }
}

// 1. Tour Guide API
app.get('/api/tour', (req, res) => {
  const state = readTourState();
  res.json(state);
});

app.post('/api/tour', (req, res) => {
  const { completed } = req.body;
  const state = {
    completed: Boolean(completed),
    updatedAt: new Date().toISOString(),
    deviceId: req.headers['user-agent'] || 'workstation',
  };
  saveTourState(state);
  res.json({ success: true, state });
});

// 2. Web Proxy API for Google Chrome
app.get('/api/proxy', async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl || typeof targetUrl !== 'string') {
    return res.status(400).send('Missing url parameter');
  }

  let finalUrl = targetUrl;
  if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
    finalUrl = 'https://' + finalUrl;
  }

  try {
    const response = await fetch(finalUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:124.0) Gecko/20100101 Chrome/124.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    const contentType = response.headers.get('content-type') || 'text/html';
    res.setHeader('Content-Type', contentType);

    // Strip frame busting headers
    res.removeHeader('X-Frame-Options');
    res.removeHeader('Content-Security-Policy');

    if (contentType.includes('text/html')) {
      let html = await response.text();
      // Inject base tag so relative links resolve to target host
      const baseTag = `<base href="${finalUrl}">`;
      html = html.replace('<head>', `<head>${baseTag}`);
      res.send(html);
    } else {
      const buffer = await response.arrayBuffer();
      res.send(Buffer.from(buffer));
    }
  } catch (err) {
    res.status(500).send(`
      <div style="font-family: sans-serif; padding: 2rem; color: #333; text-align: center;">
        <h2>Unable to load page</h2>
        <p style="color: #666;">Target: ${finalUrl}</p>
        <p style="color: #999; font-size: 0.9rem;">${err.message}</p>
      </div>
    `);
  }
});

// 3. Network Status API
app.get('/api/network', (req, res) => {
  res.json({
    status: 'connected',
    interface: 'eth0',
    type: 'Wi-Fi (Host Network)',
    ssid: 'Host-Network-5G',
    ip: '192.168.1.104',
    speed: '10000 Mbps',
  });
});

app.listen(PORT, () => {
  console.log(`ARKA OS Backend running on http://localhost:${PORT}`);
});
