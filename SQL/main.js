export const CayjuLib = {
  SQLConn: class {
    constructor(config = {}) {
      this.config = config;
      this.connected = false;
      console.log('SQL connection created');
    }

    async sendReq(query) {
      console.log('Executing:', query);
      return { rows: [], query };
    }

    close() {
      this.connected = false;
      console.log('SQL connection closed');
    }
  }
};
