import { WebSocketServer, WebSocket } from 'ws';

export const CayjuLib = {
  Server: class {
    constructor(port = 8080) {
      this.port = port;
      this.clients = new Set();
      this.handlers = { message: [], connection: [], close: [] };
      this.wss = null;
      this.start();
    }

    start() {
      this.wss = new WebSocketServer({ port: this.port });
      console.log(`WebSocket server running on port ${this.port}`);

      this.wss.on('connection', (ws) => {
        this.clients.add(ws);
        this.handlers.connection.forEach(fn => fn(ws));

        ws.on('message', (data) => {
          const msg = data.toString();
          this.handlers.message.forEach(fn => fn(msg, ws));
        });

        ws.on('close', () => {
          this.clients.delete(ws);
          this.handlers.close.forEach(fn => fn(ws));
        });
      });
    }

    on(event, handler) {
      if (this.handlers[event]) this.handlers[event].push(handler);
    }

    broadcast(message) {
      const data = typeof message === 'string' ? message : JSON.stringify(message);
      for (const client of this.clients) {
        if (client.readyState === WebSocket.OPEN) client.send(data);
      }
    }

    send(ws, message) {
      const data = typeof message === 'string' ? message : JSON.stringify(message);
      if (ws.readyState === WebSocket.OPEN) ws.send(data);
    }

    close() {
      if (this.wss) this.wss.close();
    }
  },

  connect: (url) => new WebSocket(url)
};
