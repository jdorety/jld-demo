import flureenjs from "./flureenjs.cjs";

const url = process.env.LEDGER_URL || "http://localhost";

const port = process.env.LEDGER_PORT || 8090;

//global.XMLHttpRequest = require("xhr2");
//global.WebSocket = require("ws"); // https://flaviocopes.com/node-websockets/
const host = `${url}:${port}`;
const c_opts: flureenjs.ConnOptions = { keepAlive: true };
//flureenjs.set_logging({ level: "finest" });

let cached = global.flureeConn;

if (!cached) {
  cached = global.flureeConn = { conn: null, promise: null };
}

export async function connectToFluree() {
  if (cached.conn) {
    console.debug("reusing connection", cached.conn.id);
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = flureenjs
      .connect(host, c_opts)
      .then((conn: typeof cached.conn) => {
        console.debug("conn.ts -- connection", conn.id);
        return conn;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export function set_logging(arg0: { level: string }) {
  throw new Error("Function not implemented.");
}
