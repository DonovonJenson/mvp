var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var request = require('request')
var rp = require('request-promise');
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

app.post('/remove', (req, res) =>{
	res.status(201);
	console.log(req.body)
	Rhymeset.find({ core:req.body.core}).remove( (err, info)=>{
		res.send('removed!' + req.body.core)
	} )
})

app.get('/rhymes', (req, res) => {
	res.status(200);
	request('http://setgetgo.com/randomword/get.php', (error, response, body) => {
    	getRhymes(body, res);
    });
    getRhymesFromDatabase(res);
})

var getRhymesFromDatabase = (res) => {
	Rhymeset.aggregate(
   [ { $sample: { size: 1 } } ])
	.then((data)=>{
		console.log(data);
		res.send(data);
	})

}


var getRhymes = (rhymeWord, res) => {
	//Rhymebrain results 
	var brainurl = 'http://rhymebrain.com/talk?function=getRhymes&word=' + rhymeWord;
	var brainOptions = {
		uri: brainurl
	}

	rp(brainOptions, (error, response, body) => {})
	.then((body) =>{
		body = JSON.parse(body)
		if (body[0].freq > 17){
		console.log(body[0]);
		var zero = body[0].word;
		body.shift();
	  		body.sort((a,b) => {
  		if (a.score !== b.score){
  			return b.score - a.score
  		} else if (a.syllables !== b.syllables) {
  			return a.syllables - b.syllables
  		} else {
		  return b.freq - a.freq;
		  }
	})
	var currentRhyme = zero;
	var rhymes = [body[1].word,body[2].word,body[3].word,body[4].word]
	var newRhymes = new Rhymeset({core:currentRhyme,rhymeSet: rhymes})
	newRhymes.save((err,newRhymes)=>{
			console.log(err,newRhymes)
		})
}
	//res.send(body);
	})


}

    