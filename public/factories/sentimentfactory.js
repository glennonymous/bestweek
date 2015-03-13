
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
            var tweets = this.serializeTweets(twoots);
            //console.log('into user factory', tweets);
            return $http.post('/alchemy', {
                text: tweets,
            }).then(function(response){
                return response.data;
            });
        }
    }
});

//app.factory('sentimentFactory', function($http){
//
//    //var req = {
//    //    method: 'POST',
//    //    url: 'http://access.alchemyapi.com/calls/text/TextGetTextSentiment',
//    //    headers: {
//    //        'Content-Type': 'application/x-www-form-urlencoded'
//    //    },
//    //    apikey: '97ea261f6970ea411aaad0170e93cb183b6b9ceb',
//    //}
//
//    return {
//        serializeTweets: function (arr) {
//            var arrstr;
//            var serialize = function(obj) {
//                var str = [];
//                for(var p in obj)
//                    if (obj.hasOwnProperty(p)) {
//                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
//                    }
//                return str.join("&");
//            }
//            for (var i in arr) {
//                arrstr = arrstr + serialize(arr[i]);
//            }
//            return arrstr;
//        },
//        getTextSentiment: function(twoots){
//            var tweets = this.serializeTweets(twoots);
//            console.log('into user factory', tweets);
//            $http({
//                method: 'POST',
//                url: 'http://access.alchemyapi.com/calls/text/TextGetTextSentiment',
//                headers: {
//                    'Content-Type': 'application/x-www-form-urlencoded'
//                },
//                dataType:'jsonp',
//                contentType:'json',
//                jsonpCallback:'callback',
//                data:{
//                    apikey:'b03b4343f7bd9a9e836536404cefca5680beebc6',
//                    text:tweets,
//                    showSourceText:1,
//                    jsonp:'callback',
//                    outputMode:'json'
//
//                },
//                context: this
//            }).success(function(data){
//                console.log('Sentiments Analysis sucessful..');
//                console.log(data);
//                var text=data.text;
//                //if(data.docSentiment.type==="negative")
//                //{
//                //    displayNegetiveAnalysis(text);
//                //}
//                //else if(data.docSentiment.type==="positive"){
//                //    displayPositiveAnalysis(text);
//                //}
//            })
//                .error(function(err) {
//
//                    console.log('Sentiments Analysis error:', err);
//                });
//            }
//            //return $http.post(req, tweets).then(function(response){
//            //    console.log(response);
//            //    return response.data;
//            //})
//        }
//    })
