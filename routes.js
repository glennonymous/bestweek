var router = require('express').Router(),
	passport = require('passport'),
    AlchemyAPI = require('alchemy-api');

// place this before any request handler
// it will run first, and either continue to 
// the following handler, or kick us over to 
// an error handling middleware
function isAuthenticated (req, res, next) {
	// if req.user exists, simply continue on
	// i.e. user is authenticated
	if (req.user) next();
	// otherwise
	else {
		// build a 401
		var err = new Error('Unauthorized');
		err.status = 401;
		// and kick it to the next error handling middleware
		// i.e. the user is not authenticated
		next(err);
	}
}

var alchemy = new AlchemyAPI('97ea261f6970ea411aaad0170e93cb183b6b9ceb');

router.get('/', function (req, res) {
	// only authenticated users get to witness the coolest
	if (req.user) res.sendFile(__dirname + '/index.html');
	else res.sendFile(__dirname + '/login.html');
});

// because `isAuthenticated` sits just before our handler
// the handler will only run if the user is authenticated
router.get('/tweets', isAuthenticated, function (req, res, next) {
	var handle = req.query.handle;
	// using our user-specific twitter client
	// get the tweets of the specified handle (should be placed in the query string)
	req.user.client.get('statuses/user_timeline', {
		screen_name: handle,
        count: 200
	}, function (err, tweets) {
		if (err) return next(err);
		var leanTweets = tweets.map(function (tweet) {
			// extract relevant info
			return {
				name: tweet.user.name,
				handle: tweet.user.screen_name,
				text: tweet.text,
				date: tweet.created_at,
				imageUrl: tweet.user.profile_image_url
			};
		});
		res.json(leanTweets);
	});
});

router.get('/logout', function (req, res) {
	// passport attaches this function to req for us
	req.logout();
	res.redirect('/');
});

// if the user requests a login through twitter
// execute passport's twitter strategy
router.get('/auth/twitter', passport.authenticate('twitter'));

// if twitter sends us an authenticated user
// execute passport's twitter strategy
// afterwards, redirect to root
router.get('/auth/twitter/callback', passport.authenticate('twitter'), function (req, res) {
	res.redirect('/');
});

router.post('/alchemy', function(req, res) {
    alchemy.sentiment(req.body.text, {}, function(err, response){
        if (err) throw err;
        //var sentiment = response;
        var sentiment = response.docSentiment;
        res.send(sentiment);
    });
})

module.exports = router;