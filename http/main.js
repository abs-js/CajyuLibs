import http from 'http';

export const CayjuLib = {
  Server: class {
    constructor(port = 3000) {
      this.port = port;
      this.routes = {};
      this.postHandlers = [];
      this.sleeping = false;
      this.server = null;
      this.wake();
    }

    wake() {
      if (this.server) return;
      this.sleeping = false;
      this.server = http.createServer(async (req, res) => {
        if (this.sleeping) {
          res.writeHead(503);
          res.end(JSON.stringify({ error: 'Server is sleeping' }));
          return;
        }

        if (req.method === 'POST') {
          let body = '';
          for await (const chunk of req) body += chunk;
          let json = {};
          try { json = JSON.parse(body || '{}'); } catch { json = {}; }

          for (const handler of this.postHandlers) {
            try {
              const result = await handler(json);
              if (result !== undefined) {
                const code = result.code || 200;
                const payload = { ...result };
                delete payload.code;
                res.writeHead(code, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(payload));
                return;
              }
            } catch (e) {
              res.writeHead(500);
              res.end(JSON.stringify({ error: String(e.message) }));
              return;
            }
          }
          res.writeHead(404);
          res.end(JSON.stringify({ error: 'No POST handler' }));
          return;
        }

        const url = req.url === '/' ? '/index.html' : req.url;
        if (this.routes[url]) {
          const content = this.routes[url];
          const type = typeof content === 'string' && content.includes('<') ? 'text/html' : 'text/plain';
          res.writeHead(200, { 'Content-Type': type });
          res.end(String(content));
        } else {
          res.writeHead(404);
          res.end('Not found');
        }
      });

      this.server.listen(this.port, () => {
        console.log(`Server running on port ${this.port}`);
      });
    }

    sleep() {
      this.sleeping = true;
      console.log('Server is now sleeping');
    }

    post(handler) {
      if (typeof handler === 'function') {
        this.postHandlers.push(handler);
        console.log('POST handler registered');
      }
    }

    file(route, content) {
      const r = route.startsWith('/') ? route : '/' + route;
      this.routes[r] = content;
      console.log(`Rota registrada: ${r}`);
    }

    close() {
      if (this.server) {
        this.server.close();
        this.server = null;
      }
    }
  }
};
