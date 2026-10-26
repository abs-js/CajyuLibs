import crypto from 'crypto';

export const CajyuLib = {
  Hash: class {
    constructor(password) {
      this.hash = crypto.createHash('sha256').update(password).digest('hex');
    }
    async verify(password) {
      const h = crypto.createHash('sha256').update(password).digest('hex');
      return h === this.hash;
    }
  },

  Token: class {
    constructor(data) {
      this.data = data;
      this.token = crypto.randomBytes(16).toString('hex');
      this.expires = Date.now() + (data.expires || 3600) * 1000;
    }
    async verify(token) {
      return token === this.token && Date.now() < this.expires;
    }
  },

  Session: class {
    constructor(user) {
      this.user = user;
      this.active = true;
    }
    revoke() {
      this.active = false;
    }
  }
};
