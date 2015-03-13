app.directive('tweet', function () {
    return {
        restrict: 'E',
        scope: {
            theTweet: '='
        },
        templateUrl: 'directives/tweet/tweet.html'
    };
});