
app.factory('sentimentFactory', function($http) {


    return {
        filterTweetTextByMonth: function (arr) {
            var months = [Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec];
            var month = null;
            var filteredTweets = [];
            var counter = -1;
            var Tweet = function(month, tweets) {
                this.month = month;
                this.tweets = tweets;
            }

            for (var obj in arr) {
                // Find out what the month in the date of the object is
                var monthOfCurrentObj;
                for (var m in months) {
                    if (arr[obj].date.indexOf(months[m]) !== -1) {
                        monthOfCurrentObj = months[m];
                    }
                }
                // Now find out if the monthOfCurrentObj is the month currently set.
                // If not, assign it, make a new object with month as the month
                // and the text as the text, push it onto the array and
                // increment the counter.
                if (month === null || month !== monthOfCurrentObj) {
                    month = monthOfCurrentObj;
                    filteredTweets = filteredTweets.push(new Tweet(monthOfCurrentObj, arr[obj].text))
                    counter++
                }
                // Otherwise, just concatenate the text of the tweet onto the object
                // at the counter index.
                else {
                    filteredTweets[counter].tweets = filteredTweets[counter].tweets + arr[obj].text
                }
            }
            return filteredTweets
        },

        serialize: function (obj) {
            var str = [];
            for (var p in obj)
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            return str.join("&");
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