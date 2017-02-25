"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  let save_get_tweets = {
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet);
      callback(null, true);
    },

    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
    }
  };
  return save_get_tweets;
}
