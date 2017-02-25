"use strict";

// Basic express setup:
require('dotenv').config();
const PORT            = process.env.PORT || 8080;
const express         = require("express");
const bodyParser      = require("body-parser");
const app             = express();
const sassMiddleware  = require('node-sass-middleware');
const cookieSession   = require('cookie-session');
const methodOverride  = require('method-override');

app.use(sassMiddleware({
  src: 'public/styles/sass',
  dest: 'public/styles',
  debug: false,
  outputStyle: 'compressed',
  prefix: '/styles'
}));
app.use(cookieSession({ name:'session',
                        keys:['key']}));
app.use(methodOverride('_method')) // override with POST having ?_method=DELETE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// // The in-memory database of tweets. It's a basic object with an array in it.
// const db = require("./lib/in-memory-db");
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;


MongoClient.connect(MONGODB_URI, (err, db) => {
  // The `data-helpers` module provides an interface to the database of tweets.
  // This simple interface layer has a big benefit: we could switch out the
  // actual database it uses and see little to no changes elsewhere in the code
  // (hint hint).
  //
  // Because it exports a function that expects the `db` as a parameter, we can
  // require it and pass the `db` parameter immediately:
  const DataHelpers = require("./lib/data-helpers.js")(db);
  console.log('org1');
  // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
  // so it can define routes that use it to interact with the data layer.
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  console.log('org2');
  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);
  console.log('org3');


  // Trying to do similar to the above data-helper, but for the case of users
  const userDb = require("./lib/in-memory-user-db");
  console.log('db');
  const userHelpers = require("./lib/user-helpers.js")(userDb);
  console.log('userDb');
  const usersRoutes = require("./routes/registration")(userHelpers);
  console.log('userRoutes');
  app.use("/users", usersRoutes);
  // usersRoutes = require("./routes/login")(userHelpers);
  // app.use("/users", usersRoutes);



  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
  // db.close();
})
