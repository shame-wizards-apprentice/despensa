// Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models");

// Express router methods 
const router = express.Router();

const { User } = require('../models');

router.get("/", (req, res) => {
	res.render("index", {username: "Angel", email: "skelliebunnie@gmail.com", theme: "metro"});
});

// Create Route
router.post("/api/signup", function(req, res) {
  User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      theme_id: req.body.theme_id
    })
  // ,
  //   db.Location.create({
  //     name: "Shopping list",
  //     type: "list",
  //   }, {
  //     name: "Pantry",
  //     type: "pantry"
  //   },
  //   ),
  //   db.Container.create({
  //     type: "shelf",
  //   }, {
  //     type: "drawer",
  //   })
    .then((data) => {}).then(data => {
      res.json(data)
    }).catch(err => {
      res.status(500).send(err.message);
    });
});

// Login route
router.post("/api/login", (req, res) => {
  db.User.findOne({
    where: {
      username: req.body.username
    }
  }).then(data => {
    if (!data) {
      res.status(404).send("user does not exist...on this app.")
    } else {
      if (bcrypt.compareSync(req.body.password, data.password)) {
        req.session.user = {
          id: data.id,
          username: data.username
        }
        // res.json(data);
        res.render("profile", {user: req.session.user});
      } else {
        res.status(401).send("Ah ah ah! You didn't say the magic word...")
      }
    }
  }).catch(err => {
    if (err) console.log(err.message)
    res.status(500).send("Internal server error")
  });

});

// Sessions route
// router.get("/readsessions", (req, res) => {
// 			// no need to do anything
//     }).then((data) => {
//         res.json(data)
//     }).catch(err => {
//         res.status(500).send(err.message);
//     });
router.get('/profile', (req, res) => {
  if (req.session.user) {
    res.render("profile", { user: req.session.user });
  } else {
    res.send("Login first, please");
  }
});


// Test Route
router.get("/lardersquadVIP", (req, res) => {
  if (req.session.user) {
    res.send(`You are part of an exceptional group of people, ${req.session.user.username}.`)
  } else {
    res.status(401).send("login required.")
  }
});

// Update Route
router.put("/api/users/update/:id", (req, res) => {
	console.log(req.body);
  let userObj = {};
  if (req.body.username !== "" && req.body.username !== null) {
    userObj.username = req.body.username;
  }
  if (req.body.email !== "" && req.body.email !== null) {
    userObj.email = req.body.email;
  }
  if (req.body.password !== "" && req.body.password !== null) {
    userObj.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null);
  }
  if (req.body.theme_id !== "" && req.body.theme_id !== null) {
    userObj.theme_id = req.body.theme_id;
  }
  User.update(
    userObj, {
      where: {
        id: req.params.id
      }
    }).then((data) => {
    console.log(data)
    res.send("User info updated.");
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

// Delete Route
// router.delete("users/delete/:id", function (req, res) {
//     User.destroy({
//         where: {
//             id: req.params.id
//         }
//     }).then((data) => {
//         res.json(data);
//     }).catch(err => {
//         res.status(500).send(err.message);
//     });
// });

// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
  console.log("success")
})


// Export routes for server.js to use.
module.exports = router;