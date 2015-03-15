
app.factory('sentimentFactory', function($http) {


    return {
        serializeTweets: function (arr) {
            var arrstr;
            var serialize = function (obj) {
                var str = [];
                for (var p in obj)
                    if (obj.hasOwnProperty(p)) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                return str.join("&");
            }
            for (var i in arr) {
                arrstr = arrstr + serialize(arr[i]);
            }
            return arrstr;
        },
        getTextSentiment: function (twoots) {
            console.log('into user factory', twoots);
            var tweets = this.serializeTweets(twoots);
            console.log('into user factory', tweets);
            return $http.post('/alchemy', {
                text: tweets,
            }).then(function(response){
                return response.data;
            });
        }
    }
});