# CajyuLibs

**Official libraries for the [Cajyu](https://github.com/abs-js/Cajyu) programming language.**

Install any library with:

```bash
cajyu inst http
cajyu inst serial
cajyu inst fs
cajyu inst math
```

Then import in your `.cjy` files:

```cajyu
import Server from CajyuLibs.http
import print from CajyuLibs.serial
```

## Available Libraries

| Library | Description |
|---------|-------------|
| `http`  | Real HTTP server with POST handlers, sleep/wake, and static files |
| `serial`| Console output (`print`, `log`) |
| `fs`    | File system helpers |
| `math`  | Basic math operations |

Each library is a standard Node.js module that exports a `CayjuLib` object.

## Structure

```
CajyuLibs/
├── http/
│   ├── main.js
│   └── package.json
├── serial/
├── fs/
└── math/
```

## Contributing

Want to add a new library? Open a PR. Keep the export as:

```js
export const CayjuLib = {
  // your functions and classes
};
```
