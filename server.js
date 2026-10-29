// Локальний сервер на вбудованому модулі http (без сторонніх бібліотек)
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const ROOT = path.join(__dirname, 'docs');

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
};

const stack = ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'REST API'];

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);

  // REST-ендпоінт: GET /api/stack повертає JSON
  if (req.method === 'GET' && req.url === '/api/stack') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ count: stack.length, stack }));
    return;
  }

  // Статичні файли сторінки з папки docs
  const file = req.url === '/' ? 'index.html' : path.basename(req.url);
  fs.readFile(path.join(ROOT, file), (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 – файл не знайдено');
      return;
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'text/plain' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Сервер запущено: http://localhost:${PORT}`);
});
