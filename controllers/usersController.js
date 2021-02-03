// Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const chalk = require('chalk');
const db = require("../models");

// Express router methods
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.session.user);
  let id;
  if(req.session.user) {
  	id = req.session.user.id;
  } else {
  	id = 6;
  }
  console.log(id);

  db.User.findOne({
  		where: {
  			id: id
  		},
  		include: [db.Theme, db.Location, db.Food]
  	}).then(data => {
  		console.log(data);
  		res.render("index", data.dataValues);

  	}).catch(err => {
  		res.render("index", { theme: "metro", message: "Oops, I'm sorry! I'm not supposed to talk to strangers." });
  	});
});

// Create Route
router.post("/api/signup", function(req, res) {
	console.log(chalk.bgGreen(' SIGNING UP '));
  createUser(req.body, function(data) {
    // console.log(data);
    res.json(data);
    // res.redirect('/', {theme: "cute"});
  });
});

// Login route
router.post("/api/login", (req, res) => {
	console.log(chalk.bgCyan(' LOGGING IN '));
  db.User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((data) => {
    if (!data) {
      res.status(404).send("user does not exist...on this app.");
    } else {
      if (bcrypt.compareSync(req.body.password, data.password)) {
        req.session.user = {
          id: data.id,
          email: data.email,
        };
        // res.json(data);
        res.json(req.session.user);
      } else {
        res
          .status(401)
          .send("Oops, I'm sorry! I'm not supposed to talk to strangers.");
      }
    }
  }).catch((err) => {
    if (err) console.log(err.message);
    res.status(500).send(err.message);
  });
});

router.get("/profile", (req, res) => {
  if (req.session.user) {
    res.render("profile", { user: req.session.user });
  } else {
    res.render("index", { theme: "metro", message: "Oops, I'm sorry! I'm not supposed to talk to strangers." });
  }
});

// Test Route
router.get("/lardersquadVIP", (req, res) => {
  if (req.session.user) {
    res.send(
      `You are part of an exceptional group of people, ${req.session.user.username}.`
    );
  } else {
    res
      .status(401)
      .send("Oops, I'm sorry! I'm not supposed to talk to strangers.");
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
    userObj.password = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10),
      null
    );
  }
  if (req.body.ThemeId !== "" && req.body.ThemeId !== null) {
    userObj.ThemeId = req.body.ThemeId;
  }
  User.update(userObj, {
      where: {
        id: req.params.id,
      },
    })
    .then((data) => {
      console.log(data);
      res.send("User info updated.");
    })
    .catch((err) => { res.status(500).send(err.message) });
});

// Delete Route
router.delete("users/delete/:id", function (req, res) {
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then((data) => {
    res.json(data);
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

// Logout route
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
  res.send("success");
});

// Functions to create user and automatically create locations for them
async function createUser(data, cb) {
  let userObj = await db.User.create({
    username: data.email,
    email: data.email,
    password: data.password,
    ThemeId: 1,
  }).catch(err => {
    return err;
  });

  if (!JSON.stringify(userObj).includes("error")) {
    await defaultLocation(userObj).catch(err => console.log(err));
    db.User.findOne({
      where: {
        id: userObj.id
      },
      include: [db.Location]
    }).then(user => {
      // return data
      console.log(`this is user: ${JSON.stringify(user, null, 2)}`);
      cb(user)
    });
  } else {
    console.log(chalk.bgRed("DANGER, WILL ROBINSON"));
    return userObj;
  }

}

async function defaultLocation(user) {
  let locationObj = await db.Location.bulkCreate([{
      name: "Shopping list",
      type: "list",
      UserId: `${user.id}`,
    },
    {
      name: "Pantry",
      type: "pantry",
      UserId: `${user.id}`,
    },
    {
      name: "Refrigerator",
      type: "refrigerator",
      UserId: `${user.id}`,
    },
    {
      name: "Freezer",
      type: "freezer",
      UserId: `${user.id}`,
    }
  ]);

  return locationObj;
};

// Export routes for server.js to use.
module.exports = router;