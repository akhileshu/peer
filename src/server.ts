import next from "next";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { setupSocketIO } from "./lib/__internal__/socket-io/setupSocketIO";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer, {
    cors: {
      origin: "*", // Make sure your client can connect
    },
  });

  setupSocketIO(io);

  httpServer
    .once("error", (err: Error) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
