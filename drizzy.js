var Twit = require('twit');

var T = new Twit(require('./config.js'));

function getUserTimeline(username, callback) {
	var userTweets = [];
	T.get('statuses/user_timeline', {screen_name: username}, 
	function(err, data, response) {
		data.forEach(function(tweet){
			userTweets.push(tweet);
		});
		callback(userTweets);
	});
}

function getUserLastTweet(username, callback) {
	var lastTweet = null;
	T.get('statuses/user_timeline', {screen_name: username}, 
	function(err, data, response) {
		data.forEach(function(tweet){
			lastTweet = data[0];
		});
		callback(lastTweet);
	});
}

// var joesLast = getUserLastTweet('vietjew', function(tweet){return tweet});


function getJoesLastTweet(callback) {
	getUserLastTweet('vietjew', function(tweet){
		callback(tweet);
	});
}


getJoesLastTweet(function(tweet){console.log(tweet);});