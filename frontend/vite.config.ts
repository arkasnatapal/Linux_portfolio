import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Built-in dev server middleware for /api endpoints.
 * Mirrors Vercel Serverless Functions (/api/*) in local development
 * without requiring an external backend server process or throwing ECONNREFUSED proxy errors.
 */
function localApiDevPlugin(): Plugin {
  return {
    name: 'local-api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        const url = new URL(req.url, 'http://localhost');

        if (url.pathname === '/api/network') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            status: 'connected',
            interface: 'eth0',
            type: 'Wi-Fi (Host Network)',
            ssid: 'Host-Network-5G',
            ip: '192.168.1.104',
            speed: '10000 Mbps',
          }));
          return;
        }

        if (url.pathname === '/api/tour') {
          res.setHeader('Content-Type', 'application/json');
          if (req.method === 'POST') {
            res.end(JSON.stringify({ success: true, state: { completed: true } }));
          } else {
            res.end(JSON.stringify({ completed: false, deviceId: 'local-workstation' }));
          }
          return;
        }

        if (url.pathname === '/api/proxy') {
          const targetUrl = url.searchParams.get('url');
          if (!targetUrl) {
            res.statusCode = 400;
            res.end('Missing url parameter');
            return;
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

            if (contentType.includes('text/html')) {
              let html = await response.text();
              const baseTag = `<base href="${finalUrl}">`;
              html = html.replace('<head>', `<head>${baseTag}`);
              res.end(html);
            } else {
              const buffer = await response.arrayBuffer();
              res.end(Buffer.from(buffer));
            }
          } catch (err: any) {
            res.statusCode = 500;
            res.end(`
              <div style="font-family: sans-serif; padding: 2rem; color: #333; text-align: center;">
                <h2>Unable to load page</h2>
                <p style="color: #666;">Target: ${finalUrl}</p>
                <p style="color: #999; font-size: 0.9rem;">${err?.message || 'Network error'}</p>
              </div>
            `);
          }
          return;
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    localApiDevPlugin(),
  ],
})
