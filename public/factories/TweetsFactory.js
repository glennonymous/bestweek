app.factory('TweetsFactory', function ($http) {
    return {
        getTweets: function (handle) {

            var queryStringParams = {};

            if (handle) {
                queryStringParams.handle = handle;
            }

            return $http.get('/tweets', { params: queryStringParams }).then(function (response) {
                return response.data;
            });
        }
    };
});