var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'
}

var logger = require('./logger');
app.use(logger);

app.use(express.static('public'));

app.use(function(req, res, next){
    // Midleware
    next();
})

app.param('name', function(req, res, next){
    var name = req.params.name;
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();

    req.blockName = block;

    next();
});

app.post('/blocks', parseUrlencoded, function(req, res){
    var newBlock = req.body;
    blocks[newBlock.name] = newBlock.description;
    res.status(201).json(newBlock.name);
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/blocks', function(req, res){
    if (req.query.limit >= 0){
        res.json(Object.keys(blocks.slice(0, req.query.limit)));   
    }else{
        res.json(Object.keys(blocks));    
    }
    // res.redirect(301, '/parts')
});

app.get('/blocks/:name', function(req, res){
    var description = blocks[req.blockName];
    if(!description){
        res.status(404).json('No description found for ' + req.params.name);
    }else{
        res.json(description);
    }
    
})

app.get('/locations/:name', function(req, res){
    var location = locations[req.blockName];
    if(!location){
        res.status(404).json('No location found for ' + req.params.name);
    }else{
        res.json(location);
    }
    
})

app.listen(port, function(){
    console.log('Listening at port %d', port)
});