console.log("New Drizzy is running!");
var Twit = require('twit');
var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send("Hello friends! See what we're up to at <a href='https://twitter.com/DrizzyAI'>Drizzy Drake's Twitter</a>.");
});
var port = process.env.PORT || 3000;
app.listen(port);

var T = new Twit(require('./config.js'));

var fs = require('fs')
var drakeCurated = fs.readFileSync('drake_curated.txt').toString().split("\n");
var oldAdvice = fs.readFileSync('100_yo.txt').toString().split("\n");

var createTweet = function() {
	var drakeLine = drakeCurated[Math.floor(Math.random()*drakeCurated.length)]
	var oldLine = oldAdvice[Math.floor(Math.random()*oldAdvice.length)]
	var newLine = drakeLine + ", " + oldLine;
	return newLine;
}

function replyToTweet(tweetId, username, message) {
	T.post('statuses/update', {in_reply_to_status_id: tweetId, status: '.@' + username + ' ' + message},
	function(err, data, response){
		console.log(data);
	});
}

function drizzyReply(tweet) {
	console.log(tweet);
	var message = createTweet();
	var tweetIdStr = tweet.id_str;
	var screenName = tweet.user.screen_name;
	replyToTweet(tweetIdStr, screenName, message);
}

var stream = T.stream('statuses/filter', {track: "@DrizzyAI"});

stream.on('tweet', function (tweet){
	drizzyReply(tweet);
})

