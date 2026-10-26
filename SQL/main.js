import { createRequire } from 'module';
const require = createRequire(import.meta.url);

let sqlite3;
try { sqlite3 = require('sqlite3').verbose(); } catch {}

export const CayjuLib = {
  SQLConn: class {
    constructor(config = {}) {
      this.config = config;
      this.db = null;
      if (sqlite3 && config.filename) {
        this.db = new sqlite3.Database(config.filename);
        console.log('SQLite connected:', config.filename);
      } else {
        console.log('SQL connection (fallback mode)');
        this.memory = [];
      }
    }

    async sendReq(query, params = []) {
      if (this.db) {
        return new Promise((resolve, reject) => {
          if (query.trim().toUpperCase().startsWith('SELECT')) {
            this.db.all(query, params, (err, rows) => {
              if (err) reject(err);
              else resolve({ rows });
            });
          } else {
            this.db.run(query, params, function(err) {
              if (err) reject(err);
              else resolve({ changes: this.changes, lastID: this.lastID });
            });
          }
        });
      }
      console.log('Query:', query);
      return { rows: [], query };
    }

    close() {
      if (this.db) {
        this.db.close();
        console.log('SQLite closed');
      }
    }
  }
};
