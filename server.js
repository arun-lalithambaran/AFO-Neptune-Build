//  OpenShift sample Node application
var express = require('express');
// var fs      = require('fs');
var app     = express();
// var eps     = require('ejs');

// app.engine('html', require('ejs').renderFile);

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.get('/info', function(req, res) {
  res.send(`Host IP : ${ip}, Port : ${port}`);
});

app.use(express.static('public'));

app.listen(port, ip);
console.log('Server running on ' + ip + ':' + port);
