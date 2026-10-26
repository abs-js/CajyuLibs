import http from 'http';

export const CajyuLib = {
  App: class {
    constructor(serverOrPort) {
      this.routes = { GET: {}, POST: {}, PUT: {}, DELETE: {} };
      this.middleware = [];
      this.plugins = {};

      if (typeof serverOrPort === 'number') {
        this.server = http.createServer((req, res) => this.handle(req, res));
        this.server.listen(serverOrPort, () => {
          console.log(`Orgapp running on port ${serverOrPort}`);
        });
      } else {
        this.server = serverOrPort;
      }
    }

    get(path, handler) { this.routes.GET[path] = handler; }
    post(path, handler) { this.routes.POST[path] = handler; }
    put(path, handler) { this.routes.PUT[path] = handler; }
    delete(path, handler) { this.routes.DELETE[path] = handler; }

    static(path, content) {
      this.get(path, () => content);
    }

    plug(instance, name) {
      this.plugins[name] = instance;
    }

    use(fn) {
      this.middleware.push(fn);
    }

    async handle(req, res) {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', async () => {
        let parsed = {};
        try { parsed = body ? JSON.parse(body) : {}; } catch {}

        const context = {
          type: req.method,
          url: req.url,
          body: parsed,
          headers: req.headers
        };

        const response = {
          use(name, method, args) {
            const plug = this.plugins?.[name];
            if (plug && typeof plug[method] === 'function') {
              return plug[method](...(args || []));
            }
          }
        };

        let index = 0;
        const next = async () => {
          if (index < this.middleware.length) {
            const mw = this.middleware[index++];
            await mw(context, response, next);
          }
        };
        await next();

        const handler = this.routes[req.method]?.[req.url];
        if (handler) {
          const result = await handler(context);
          if (typeof result === 'string') {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(result);
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result || {}));
          }
        } else {
          res.writeHead(404);
          res.end('Not found');
        }
      });
    }
  }
};
