export const CajyuLib = {
  parse: (str) => {
    try { return JSON.parse(str); }
    catch (e) { throw new Error('Invalid JSON: ' + e.message); }
  },
  stringify: (obj, space) => JSON.stringify(obj, null, space),
  isValid: (str) => {
    try { JSON.parse(str); return true; }
    catch { return false; }
  },
  get: (obj, path) => {
    return path.split('.').reduce((o, k) => (o && o[k] !== undefined) ? o[k] : undefined, obj);
  },
  set: (obj, path, value) => {
    const keys = path.split('.');
    const last = keys.pop();
    const target = keys.reduce((o, k) => o[k] = o[k] || {}, obj);
    target[last] = value;
    return obj;
  },
  merge: (...objects) => Object.assign({}, ...objects),
  keys: (obj) => Object.keys(obj),
  values: (obj) => Object.values(obj),
  entries: (obj) => Object.entries(obj)
};
