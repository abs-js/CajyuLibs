# CajyuLibs

<p align="center">
  <img src="https://raw.githubusercontent.com/abs-js/Cajyu/main/logos/logo-256.png" alt="Cajyu Logo" width="128">
</p>

**Official libraries for the [Cajyu](https://github.com/abs-js/Cajyu) language.**

Install with:

```bash
cajyu inst <name>
```

## Available Libraries

| Library     | Description |
|-------------|-------------|
| `serial`    | Console logging |
| `fs`        | File system utilities |
| `math`      | Math helpers |
| `http`      | HTTP server |
| `websocket` | WebSocket (JSON) |
| `string`    | String helpers |
| `json`      | JSON helpers |
| `exec`      | Run shell commands |
| `fetch`     | HTTP fetch |
| `SQL`       | SQL connection and queries |
| `cache`     | In-memory cache with TTL |
| `auth`      | Hash, Token and Session |
| `Orgapp`    | Higher-level app framework (routes, middleware, plugins) |

## New libraries

### SQL
```cajyu
import SQLConn from CajyuLibs.SQL
const C = new SQLConn({})
const result = wait C.sendReq("SELECT * FROM users")
C.close()
```

### cache
```cajyu
import * from CajyuLibs.cache
const c = cache()
wait c.set("key", "value")
wait c.get("key")
```

### Auth
```cajyu
import * from CajyuLibs.auth
var pass = new Hash("secret")
const ok = wait pass.verify("secret")
```

### Orgapp
```cajyu
import App from CajyuLibs.Orgapp
const app = new App(server)
app.get("/", fn req { return "Hello" })
```

Pull requests welcome.
