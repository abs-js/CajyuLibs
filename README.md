# CajyuLibs

**Official libraries for the [Cajyu](https://github.com/abs-js/Cajyu) language.**

Install with:

```bash
cajyu inst <name>
```

## Available Libraries

| Library     | Description |
|-------------|-------------|
| `serial`    | Console logging (`print`, `info`, `warn`, `error`, timers) |
| `fs`        | File system utilities |
| `math`      | Arithmetic, trigonometry, random, helpers |
| `http`      | HTTP server with POST handlers, sleep/wake |
| `websocket` | WebSocket server/client that automatically sends and receives JSON |
| `string`    | String manipulation helpers |
| `json`      | JSON parse, stringify, get/set by path, merge |
| `exec`      | Run shell commands and get the output |
| `fetch`     | HTTP fetch with callback (result + elapsed ms) |

## Usage examples

```cajyu
import exec from CajyuLibs.exec
var files = exec.exec("ls -a")

import fetch from CajyuLibs.fetch
fetch.fetch("https://api.example.com", {}, null, fn result, ms {
  print(result)
  print("took " + ms + " ms")
})

import str from CajyuLibs.string
print(str.upper("hello"))

import json from CajyuLibs.json
var obj = json.parse('{"a":1}')
```

## WebSocket

Messages are automatically `JSON.stringify`ed when sending and `JSON.parse`d when receiving.

## Structure

Each library is a folder with `main.js` (exports `CayjuLib`) and `package.json`.

Pull requests welcome.
