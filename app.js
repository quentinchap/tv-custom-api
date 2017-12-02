const express = require('express');
const fs = require('fs');
const https = require('https');

var channel = require('./route/channel');

var app = express();


// load option file
var options = require('./options');
app.set('options', options);


var port = 8245;

app.use('/channel', channel);


if (options.ssl) {
    var privateKey = fs.readFileSync('/ssl/privkey.pem');
    var certificate = fs.readFileSync('/ssl/fullchain.pem');

    https.createServer({
        key: privateKey,
        cert: certificate
    }, app).listen(port, function() {
        console.log('Start on port: ' + port + ' ssl on');
    });
} else {
    app.listen(port, function() {
        console.log('Start on port: ' + port + ' ssl off');
    });
}