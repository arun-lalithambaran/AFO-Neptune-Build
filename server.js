const http = require('http');
const app = require('./app');
const port = process.env.PORT || 8080;
const ip   = process.env.IP || '0.0.0.0';
const server = http.createServer(app);

server.listen(port, ip, () => {
    console.log("Server listening on port " + port);
})
