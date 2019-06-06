const https = require('https');
const fs = require('fs');
const WebSocket = require('ws');

const server = https.createServer({
  key: fs.readFileSync('cert/server.key'),
  cert: fs.readFileSync('cert/oscorp.tech.crt'),
});

const wss = new WebSocket.Server({ server });
wss.on('connection', function connection(ws) {
 ws.on('message', function incoming(message) {
   console.log('received: %s', message);
 });

 ws.send('something');
});
server.listen(7777);


// https.createServer(options, (req, res) => {
//   res.writeHead(200);
//   res.end('hello world\n');
// }).listen(8000);