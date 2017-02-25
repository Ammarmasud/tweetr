"use strict";

// Defines helper functions for saving and getting users, using the database `db`
module.exports = function makeUserHelpers(db) {

  let save_get_users = {
    saveUser: function(newUser, callback) {
      db.users.push(newUser);
      callback(null, true);
    },
    // Get all users in `db`, sorted by newest first
    getUsers: function(callback) {
      callback(null, db.users);
    }
  };

  // let save_get_users = {
  //   saveUser: function(newUser, callback) {
  //     db.collection("users").insertOne(newUser);
  //     callback(null, true);
  //   },

  //   getUsers: function(callback) {
  //     db.collection("users").find().toArray(callback);
  //   }
  // };
  return save_get_users;
}
