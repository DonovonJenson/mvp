var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

app.listen(8080);
console.log('App listening on 8080')

app.get('/', (req, res) => {
	console.log('somethinghappened')
	res.status(200);
	res.sendfile('./public/index.html')
})
