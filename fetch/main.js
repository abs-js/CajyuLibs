export const CayjuLib = {
  fetch: async (url, headers = {}, body = null, callback) => {
    const start = Date.now();
    try {
      const options = {
        method: body ? 'POST' : 'GET',
        headers: { 'Content-Type': 'application/json', ...headers }
      };
      if (body) options.body = typeof body === 'string' ? body : JSON.stringify(body);

      const res = await fetch(url, options);
      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch { data = text; }

      const elapsed = Date.now() - start;
      if (typeof callback === 'function') {
        callback(data, elapsed);
      }
      return data;
    } catch (e) {
      const elapsed = Date.now() - start;
      if (typeof callback === 'function') callback({ error: e.message }, elapsed);
      throw e;
    }
  }
};
