"use strict";

const generateRandomString  = require('../lib/util/generateRandomString');
const userHelper           = require("../lib/util/user-helper");
const checkEmails           = require('../lib/util/checkEmails');
const bcrypt                = require('bcrypt');
const cookieSession         = require('cookie-session');

const express               = require('express');
const tweetsRoutes          = express.Router();

module.exports = function(user_helpers) {
  let users_json;
  user_helpers.getUsers((err, users) => {
    if (err) {
      console.log('0');
      res.status(500).json({ error: err.message });
    } else {
      console.log('1');
      users_json = users;
    }
  });
  console.log('2');
  // Registration
  tweetsRoutes.get("/", (req, res) => {
    res.json(users_json);
  });

  tweetsRoutes.post("/", (req, res) => {
    console.log('got to registration.js line 30');
    if (!(req.body.name &&
        req.body.handle &&
        req.body.email &&
        req.body.password &&
        !(checkEmails(users_json, req.body.email)))) {
      res.status(400).json({ error: 'invalid request: Missing data in POST body'});
      return;
    }
    console.log('got to registration.js line 39');
    //  new
    if (req.body.name &&
        req.body.handle &&
        req.body.email &&
        req.body.password &&
        !(checkEmails(users_json, req.body.email))) {

      const id = generateRandomString(users_json);
      // const new_user = {
      //                   "name": req.body.name,
      //                   "id": id,
      //                   "avatars": userHelper.generateRandomAvatar(req.body.handle).avatars,
      //                   "handle": req.body.handle,
      //                   "email": req.body.email,
      //                   "password":bcrypt.hashSync(req.body.password, 10),
      //                   "likes":[],
      //                   "created_at": Date.now()
      //                 };
      req.session.user_id = id;

      user_helpers.saveUser(new_user, (err) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(201).send();
        }
      });
    }
  });

  return tweetsRoutes;
}
