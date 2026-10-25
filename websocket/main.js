import { WebSocketServer, WebSocket } from 'ws';

export const CajyuLib = {
  Server: class {
    constructor(port = 8080) {
      this.port = port;
      this.clients = new Set();
      this.handlers = { message: [], connection: [], close: [] };
      this.wss = null;
      this.start();
    }

    _log(msg) {
      console.log(`[WS:${this.port}] ${msg}`);
    }

    start() {
      if (this.wss) return;
      this.wss = new WebSocketServer({ port: this.port });
      this._log(`Server created on port ${this.port}`);

      this.wss.on('connection', (ws) => {
        this.clients.add(ws);
        this._log(`Client connected (${this.clients.size} total)`);
        this.handlers.connection.forEach(fn => fn(ws));

        ws.on('message', (data) => {
          let msg;
          try { msg = JSON.parse(data.toString()); }
          catch { msg = data.toString(); }
          this.handlers.message.forEach(fn => fn(msg, ws));
        });

        ws.on('close', () => {
          this.clients.delete(ws);
          this._log(`Client disconnected (${this.clients.size} remaining)`);
          this.handlers.close.forEach(fn => fn(ws));
        });

        ws.on('error', (err) => {
          this._log(`Client error: ${err.message}`);
          this.clients.delete(ws);
        });
      });

      this.wss.on('error', (err) => {
        this._log(`Server error: ${err.message}`);
      });
    }

    on(event, handler) {
      if (this.handlers[event]) {
        this.handlers[event].push(handler);
        this._log(`Handler registered for event "${event}"`);
      } else {
        this._log(`Unknown event "${event}" — ignored`);
      }
    }

    broadcast(message) {
      const data = JSON.stringify(message);
      let sent = 0;
      for (const client of this.clients) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
          sent++;
        }
      }
      this._log(`Broadcast sent to ${sent}/${this.clients.size} clients`);
    }

    send(ws, message) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
      } else {
        this._log(`Send failed — client not open (state: ${ws.readyState})`);
      }
    }

    close() {
      if (this.wss) {
        this.wss.close();
        this.wss = null;
        this._log(`Server closed`);
      }
    }
  },

  connect: (url) => {
    const ws = new WebSocket(url);
    const tag = `[WS:${url}]`;

    const originalSend = ws.send.bind(ws);
    ws.send = (data) => originalSend(JSON.stringify(data));

    ws.on('open',  ()    => console.log(`${tag} Connected`));
    ws.on('close', ()    => console.log(`${tag} Disconnected`));
    ws.on('error', (err) => console.log(`${tag} Error: ${err.message}`));

    return ws;
  }
};
