import { serve } from 'bun';
import { config } from 'dotenv';

config();

import { registerRoutes } from './src/server/authRoutes.js';
import { apiRoutes } from './src/server/apiRoutes.js';

const mimeTypes = {
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.html': 'text/html',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.csv': 'text/csv',
};

function getMimeType(path) {
  const ext = path.slice(path.lastIndexOf('.'));
  return mimeTypes[ext] || 'text/plain';
}

const routes = [];

function addRoute(method, path, handler) {
  routes.push({ method, path, handler });
}

registerRoutes({ post: (path, handler) => addRoute('POST', path, handler) });
apiRoutes({ get: (path, handler) => addRoute('GET', path, handler), post: (path, handler) => addRoute('POST', path, handler) });

serve({
  port: process.env.PORT || 3000,
  async fetch(request) {
    const url = new URL(request.url);
    let path = url.pathname;
    const method = request.method;

    const matchedRoute = routes.find(r => r.method === method && r.path === path);
    if (matchedRoute) {
      return matchedRoute.handler(request);
    }

    if (path === '/') path = '/index.html';

    let file = Bun.file('.' + path);
    let exists = await file.exists();
    
    if (!exists && !path.includes('.')) {
      file = Bun.file('.' + path + '.js');
      exists = await file.exists();
    }
    
    if (exists) {
      return new Response(file, {
        headers: { 
          'Content-Type': getMimeType(path),
          'Access-Control-Allow-Origin': '*',
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'X-XSS-Protection': '1; mode=block',
        }
      });
    }

    return new Response('Not Found: ' + path, { status: 404 });
  },
});

console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
console.log('API Proxy & Auth system ready');
