console.log("New Drizzy is running!");
var Twit = require('twit');

var T = new Twit(require('./config.js'));

// function getUserTimeline(username, callback) {
// 	var userTweets = [];
// 	T.get('statuses/user_timeline', {screen_name: username},
// 	function(err, data, response) {
// 		data.forEach(function(tweet){
// 			userTweets.push(tweet);
// 		});
// 		callback(userTweets);
// 	});
// }
//
// function getUserLastTweet(username, callback) {
// 	var lastTweet = null;
// 	T.get('statuses/user_timeline', {screen_name: username},
// 	function(err, data, response) {
// 		data.forEach(function(tweet){
// 			lastTweet = data[0];
// 		});
// 		callback(lastTweet);
// 	});
// }
//
//
// function getJoesLastTweet(callback) {
// 	getUserLastTweet('vietjew', function(tweet){
// 		callback(tweet);
// 	});
// }
//
//
// function retweet(id) {
// 	T.post('statuses/retweet/:id', { id: id }, function (err, data, response) {
// 	  console.log(data)
// 	});
// }
//
// var tweetId = '593275363855241217'
// var username = '@vietjew'
//
function replyToTweet(tweetId, username, message) {
	T.post('statuses/update', {in_reply_to_status_id: tweetId, status: '@' + username + ' ' + message},
	function(err, data, response){
		console.log(data);
	});
}

function doStuffTo(tweet) {
	console.log(tweet);
	var tweetIdStr = tweet.id_str;
	var screenName = tweet.user.screen_name;
	replyToTweet(tweetIdStr, screenName, 'hey good to hear from you!');
}

var stream = T.stream('statuses/filter', {track: "@joenguyentester"});

stream.on('tweet', function (tweet){
	doStuffTo(tweet);
})

