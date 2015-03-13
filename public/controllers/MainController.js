app.controller('MainController', function ($scope, TweetsFactory, countWords) {

    $scope.search = {};

    $scope.getTweets = function (handle) {
        $scope.analyzedWords = [];
        TweetsFactory.getTweets(handle).then(function (tweets) {
            $scope.tweets = tweets;
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