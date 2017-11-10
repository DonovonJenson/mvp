var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');

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

app.get('/rhymes', (req, res) => {
	console.log('rhymes incoming!');
	res.status(200);
	http.request('http://setgetgo.com/randomword/get.php', (response) => {
		response.pipe(res);
	  }).end() 
})

function RandomWord() {
    var requestStr = "http://randomword.setgetgo.com/get.php";

    $.ajax({
        type: "GET",
        url: requestStr,
        dataType: "jsonp",
        jsonpCallback: 'RandomWordComplete'
    });
}

function RandomWordComplete(data) {
    console.log(data.Word);
}
    