export const CayjuLib = {
  cache: () => {
    const store = new Map();
    const ttls = new Map();

    return {
      async cln() { store.clear(); ttls.clear(); },
      async set(key, value) { store.set(key, value); },
      async get(key) {
        if (ttls.has(key) && Date.now() > ttls.get(key)) {
          store.delete(key);
          ttls.delete(key);
          return undefined;
        }
        return store.get(key);
      },
      async del(key) { store.delete(key); ttls.delete(key); },
      async has(key) { return store.has(key); },
      async ttl(key, seconds) {
        ttls.set(key, Date.now() + seconds * 1000);
      },
      async siz() { return store.size; }
    };
  }
};
