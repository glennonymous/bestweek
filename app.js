var express = require('express'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	// our own custom passport setup happens here
	passport = require('./passport.setup')(require('passport')),
    AlchemyAPI = require('alchemy-api');

var app = express();
var alchemy = new AlchemyAPI('97ea261f6970ea411aaad0170e93cb183b6b9ceb');
//alchemy.sentiment('glennthomasdavis.com/books', {}, function(err, response) {
//    if (err) throw err;
//
//    // See http://www.alchemyapi.com/api/ for format of returned object
//    var sentiment = response.docSentiment;
//
//    // Do something with data
//});

app.use(express.static(__dirname + '/public'));

// standard loggign and body parsing
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// allows us to associate a client/user combo with a session
// thus the user does not have to actively login every time
// they wish to access something requiring authentication
app.use(cookieParser());
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: 'zekeisthesingularity'
}));

// passport setup---this happens every request
app.use(passport.initialize());
// passport manages its own sessions by piggybacking off of
// the existing req.session that express-session makes
app.use(passport.session());

// our custom routes---the behavior of our app
app.use(require('./routes'));

// if we made it this far, then there was nothing
// that sent a response
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// standard error handling middleware
app.use(function (err, req, res, next) {
	err.status = err.status || 500;
	console.log('error', err);
	res.status(err.status).end();
});

// setup the port
var port = 8080;
// note that because we're not using local login, there's no
// need for HTTPS
app.listen(port, function () {
	console.log('A server is reluctantly listening on port', port);
});