var express = require('express');
var app = express();
var port = 3000;

var logger = require('./logger');
app.use(logger);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, function(){
    console.log('Listening at port %d', port)
});
