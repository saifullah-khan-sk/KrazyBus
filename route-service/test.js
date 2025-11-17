const http = require('http');
const app = require('./index');
const server = http.createServer(app);
server.listen(0, () => {
  const port = server.address().port;
  http.get({ port, path: '/route/health' }, res => {
    let body = '';
    res.on('data', d => body += d);
    res.on('end', () => {
      if (body.includes('"status":"ok"')) {
        console.log('route-service test passed');
        process.exit(0);
      } else {
        console.error('route-service test failed');
        process.exit(2);
      }
    });
  }).on('error', () => process.exit(2));
});
