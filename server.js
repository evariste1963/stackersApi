import { serve } from 'bun';
import { watch } from 'fs';

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

const server = serve({
  port: 3000,
  async fetch(request) {
    let url = new URL(request.url);
    let path = url.pathname;

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
        }
      });
    }

    return new Response('Not Found: ' + path, { status: 404 });
  },
});

console.log(`Server running at http://localhost:3000`);