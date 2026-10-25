export const CayjuLib = {
  App: class {
    constructor(server) {
      this.server = server;
      this.routes = { GET: {}, POST: {} };
      this.plugins = {};
      this.middleware = [];
    }

    get(path, handler) {
      this.routes.GET[path] = handler;
    }

    post(path, handler) {
      this.routes.POST[path] = handler;
    }

    static(path, handler) {
      this.get(path, handler);
    }

    plug(instance, name) {
      this.plugins[name] = instance;
    }

    use(middleware) {
      this.middleware.push(middleware);
    }
  }
};
