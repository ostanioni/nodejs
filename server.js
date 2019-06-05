const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('cert/server.key'),
  cert: fs.readFileSync('cert/oscorp.tech.crt'),
  port: 8000,
  host: '127.0.0.1',
  path: 'oscorp.tech:8000',
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000);