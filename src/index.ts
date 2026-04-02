import {
  server as WebSocketServer,
  request as WSRequest,
  connection as WSConnection
} from "websocket";
import type { Message } from "websocket";
import http from "http";

// 1. Create the HTTP server
const httpServer = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
  console.log(`${new Date()} Received request for ${request.url}`);
  response.writeHead(404);
  response.end();
});

httpServer.listen(8080, () => {
  console.log(`${new Date()} Server is listening on port 8080`);
});

// 2. Initialize the WebSocket server
const wsServer = new WebSocketServer({
  // Fixed: changed 'server' to 'httpServer' to match the variable above
  httpServer: httpServer,
  autoAcceptConnections: false,
});

function originIsAllowed(origin: string): boolean {
  // Add logic to restrict domains here
  return true;
}

// 3. Handle WebSocket requests
wsServer.on("request", (request: WSRequest) => {
  if (!originIsAllowed(request.origin)) {
    request.reject();
    console.log(`${new Date()} Connection from origin ${request.origin} rejected.`);
    return;
  }

  // Accept the connection using the 'echo-protocol'
  const connection: WSConnection = request.accept("echo-protocol", request.origin);
  console.log(`${new Date()} Connection accepted.`);

  connection.on("message", (message: Message) => {
    if (message.type === "utf8") {
      console.log("Received Message: " + message.utf8Data);
      connection.sendUTF(message.utf8Data);
    } else if (message.type === "binary") {
      console.log(`Received Binary Message of ${message.binaryData.length} bytes`);
      connection.sendBytes(message.binaryData);
    }
  });

  connection.on("close", (reasonCode: number, description: string) => {
    console.log(`${new Date()} Peer ${connection.remoteAddress} disconnected. Code: ${reasonCode}`);
  });
});