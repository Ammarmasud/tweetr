"use strict";

// Requiring a JSON file automatically parses it and returns the data. These
// are just example users to make it easier to set up real users later.
const db = {
  users: require("../data-files/initial-users")
}

module.exports = db;

