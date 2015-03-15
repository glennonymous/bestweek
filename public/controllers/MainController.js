app.controller('MainController', function ($scope, TweetsFactory, sentimentFactory, countWords) {

    $scope.search = {};

    $scope.getTweets = function (handle) {
        $scope.analyzedWords = [];
        TweetsFactory.getTweets(handle).then(function (tweets) {
            $scope.tweets = tweets;
        });
    };

    $scope.getSentiment = function (handle) {
        TweetsFactory.getTweets(handle).then(function (tweets) {
            // Changing the following line temporarily to tweets.slice[0,25]
            // for testing purposes -- change it back for
            // all tweets
            sentimentFactory.getTextSentiment(tweets.slice(3,6)).then(function (sentiment) {
               $scope.sentiment = sentiment;
                console.log(sentiment);
            });
        });

    };

    $scope.analyzeTweets = function (tweets) {

        var tweetText = tweets.map(function (tweet) {
            return tweet.text;
        });

        var allTweetTextCombined = tweetText.join(' ');

        $scope.analyzedWords = countWords(allTweetTextCombined);

    };

});