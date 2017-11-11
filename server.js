var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var request = require('request')
var db = mongoose.connection;
mongoose.connect('mongodb://localhost/test');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo connected!')
});

var rhymeSchema = mongoose.Schema ({
	core: String,
	rhymeSet: Array
})

var Rhymeset = mongoose.model('Rhymeset',rhymeSchema);

var rhymeArray = ['one','done','fun']
var newRhymes = new Rhymeset({core:'spun',rhymeSet: rhymeArray})
newRhymes.save((err,newRhymes)=>{
	console.log(newRhymes);
})



app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

app.listen(8080);
console.log('App listening on 8080')

app.get('/', (req, res) => {
	res.status(200);
	res.sendfile('./public/index.html')
})

app.get('/rhymes', (req, res) => {
	res.status(200);
	request('http://setgetgo.com/randomword/get.php', (error, response, body) => {
      getRhymes(body, res);
    });
})


var getRhymes = (rhymeWord, res) => {
	//Rhymebrain results 
	var brainurl = 'http://rhymebrain.com/talk?function=getRhymes&word=' + rhymeWord;
	var brainOptions = {
		uri: brainurl
	}
	request(brainOptions, (error, response, body) => {
		res.send(body);
	})


}

    