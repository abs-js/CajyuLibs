# CajyuLibs

**Official libraries for the [Cajyu](https://github.com/abs-js/Cajyu) language.**

Install with:

```bash
cajyu inst <name>
```

## Available Libraries

| Library     | Description                                      |
|-------------|--------------------------------------------------|
| `serial`    | Console logging (`print`, `info`, `warn`, `error`, timers) |
| `fs`        | File system utilities                            |
| `math`      | Arithmetic, trigonometry, random, helpers        |
| `http`      | HTTP server with POST handlers, sleep/wake       |
| `websocket` | WebSocket server and client (depends on `ws`)    |

## Structure

Each library is a folder containing `main.js` (exports `CayjuLib`) and `package.json`.

```
CajyuLibs/
├── serial/
├── fs/
├── math/
├── http/
└── websocket/
```

## WebSocket note

The `websocket` library depends on the `ws` package.  
`cajyu inst websocket` will automatically run `npm install` inside the library folder.

## Contributing

Keep the export shape:

```js
export const CayjuLib = {
  // functions and classes
};
```

Pull requests welcome.
