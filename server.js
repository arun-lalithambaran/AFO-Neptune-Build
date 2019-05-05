const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const ip   = process.env.IP || 'localhost';
const server = http.createServer(app);

server.listen(port, ip, () => {
    console.log("Server listening on port " + port);
})