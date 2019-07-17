const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(req)
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write("<html>");
    res.write("<header><title>Enter message</title></header>")
    res.write("<body><form action='/message' method='POST'><input type='text' name='message' /><button type='submit'>Send</button></forn></body>")
    res.write("</html>");
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    })
    req.on('end', () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      fs.writeFileSync('message.txt', message);
    })
    res.statusCode = 200;
    res.setHeader('Loccation', '/');
    return res.end();
  }
});

server.listen(3000);