"use strict";

const generateRandomString = require('../lib/util/generateRandomString');
const checkEmails = require('../lib/util/checkEmails');
const bcrypt = require('bcrypt');

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  // LOGIN
  app.post("/login", (req, res) => {
    let id = checkEmails(users, req.body.email);
    if (id && bcrypt.compareSync(req.body.password, users[id].password)) {
      req.session.user_id = id;
      res.redirect('/');
    } else {
      res.status(401).send(`<h1>401 Error: </h1><p>Incorrect username of password.</p><a href='/login'>Click here to head to try again.</a>`);
    }
  });

  app.get("/login", (req, res) => {
    if (users[req.session.user_id]) {
      res.redirect('/');
    } else {
      res.render("urls_login");
    }
  });

  // Logging out
  app.delete("/logout", (req, res) => {
    req.session = null;
    res.redirect('/');
  });

}
