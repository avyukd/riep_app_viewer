var express = require('express');
var app = express();

app.use(express.static(__dirname+'/public'));

app.get('/', function (req, res) {
})

var server = app.listen(8000)