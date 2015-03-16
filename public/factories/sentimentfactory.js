
app.factory('sentimentFactory', function($http) {


    return {
        // Creates an array of objects with the key 'month' and the key 'tweets', which is a concatenated string
        // of all the user's tweets for that month.
        filterTweetTextByMonth: function (arr) {
            var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
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
                    filteredTweets = filteredTweets.push(new Tweet(monthOfCurrentObj, (arr[obj].text + " ")))
                    counter++
                }
                // Otherwise, just concatenate the text of the tweet onto the object
                // at the counter index.
                else {
                    filteredTweets[counter].tweets = filteredTweets[counter].tweets + arr[obj].text
                }
            }
            console.log(filteredTweets);
            // Finally, serialize the string of concatenated tweets on each object
            for (var obj in filteredTweets) {
                filteredTweets[obj].tweets = this.serialize(filteredTweets[obj].tweets)
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

        getTextSentiments: function (tweets) {
            var filteredArr = this.filterTweetTextByMonth(tweets);
            console.log(filteredArr);
            var returnedArray = [];
            //Object contructor
            var scoreArray = function(month,data) {
                this.month = month;
                this.score = data;
            }
            for (var obj in filteredArr) {
                return $http.post('/alchemy', {
                    text: filteredArr[obj].tweets
                }).then(function (response) {
                    returnedArray = returnedArray.push(new scoreArray(filteredArr[obj].month,response.data));
                    return returnedArray;
                });
            }
        }
    }
});