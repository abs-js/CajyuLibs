export const CajyuLib = {
  range: (a, b, c) => {
    const r = [];
    if (b == null) {
      for (let i = 0; i < a; i++) r.push(i);
    } else if (c == null) {
      for (let i = a; i <= b; i++) r.push(i);
    } else if (c > 0) {
      for (let i = a; i <= b; i += c) r.push(i);
    } else {
      for (let i = a; i >= b; i += c) r.push(i);
    }
    return r;
  },

  len: (x) => {
    if (x == null) return 0;
    if (typeof x === 'string' || Array.isArray(x)) return x.length;
    if (typeof x === 'object') return Object.keys(x).length;
    return 0;
  },

  destroy: (obj) => {
    if (Array.isArray(obj)) return obj;
    if (typeof obj === 'object' && obj !== null) return Object.values(obj);
    return [obj];
  },

  typeOf: (x) => typeof x,
  isArray: (x) => Array.isArray(x),
  isString: (x) => typeof x === 'string',
  isNumber: (x) => typeof x === 'number',
  isObject: (x) => typeof x === 'object' && x !== null && !Array.isArray(x)
};
