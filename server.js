var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var request = require('request')

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
	request('http://setgetgo.com/randomword/get.php', (error, response, body) => {
      getRhymes(body, res);
    });
})


var getRhymes = (rhymeWord, res) => {


	//Rhymebrain results 
	var brainurl = 'http://rhymebrain.com/talk?function=getRhymes&word=' + rhymeWord;
	console.log(brainurl)
	var brainOptions = {
		uri: brainurl
	}
	request(brainOptions, (error, response, body) => {
		console.log(body);
		res.send(body);

	})


	// //console.log(rhymeWord)
	// var url = 'http://api.datamuse.com/words?rel_rhy=' + rhymeWord
	// var options = {
	// 	uri: url
	// }
	// request(options, (error, response, body) => {
	// 	console.log(error)
	// 	console.log(body);
	// 	res.send(body);

	// })

}

    