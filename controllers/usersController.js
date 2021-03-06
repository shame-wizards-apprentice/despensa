// Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models");

// Express router methods
const router = express.Router();

router.get("/", (req, res) => {

  if(req.session.user) {
  	console.log(req.session.user.id);
  	db.User.findOne({
  		where: {
  			id: req.session.user.id
  		},
  		include: [
  			{
  				model: db.Theme,
  			},
  			{
  				model: db.Location,
  				include: [db.Food]
  			}
  		]
  	}).then(data => {
  		console.log(data);

  		res.render("index", data.dataValues);

  	}).catch(err => {
  		res.status(500).render("500", { theme: "metro", message: err.message });
  		// "Oops, I'm sorry! Something went wrong ..."
  	});

  } else {
  	res.render("index", { theme: "metro", message: "Oops, I'm sorry! I'm not supposed to talk to strangers." });
  }
});

// Create Route
router.post("/api/signup", function (req, res) {
  createUser(req.body, function (data) {
  	req.session.user = {email: data.email, id: data.id};
    res.json(data);
  });
});

// Login route
router.post("/api/login", (req, res) => {
  db.User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).send("user does not exist...on this app.");
      } else {
        if (bcrypt.compareSync(req.body.password, data.password)) {
          req.session.user = {
            id: data.id,
            email: data.email,
          };
          res.json(req.session.user);
          
        } else {
          res
            .status(401)
            .send("Oops, I'm sorry! I'm not supposed to talk to strangers.");
        }
      }
    })
    .catch((err) => {
      if (err) console.log(err.message);
      res.status(500).send("Internal server error");
    });
});

router.get("/profile", (req, res) => {
  if (req.session.user) {
    res.render("profile", { user: req.session.user });
  } else {
    res.send("Oops, I'm sorry! I'm not supposed to talk to strangers.");
  }
});

// Test Route
router.get("/lardersquadVIP", (req, res) => {
  if (req.session.user) {
    res.send(
      `You are part of an exceptional group of people, ${req.session.user.email}.`
    );
  } else {
    res
      .status(401)
      .send("Oops, I'm sorry! I'm not supposed to talk to strangers.");
  }
});

// Update Route
router.put("/api/users/update", (req, res) => {
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
  
  db.User.update(userObj, {
    where: {
      id: req.session.user.id,
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
  db.User.destroy({
    where: {
      id: req.params.id
    }
  }).then((data) => {
    res.json(data);
  }).catch(err => { res.status(500).send(err.message) });
});

// Logout route
router.get("/api/users/signout", (req, res) => {
  req.session.destroy();
  res.send("success");
});

// Functions to create user and automatically create locations for them
async function createUser(data, cb) {
  let userObj = await db.User.create({
    username: data.email,
    email: data.email,
    password: data.password,
    ThemeId: 1,
  });

  // Call the defaultLocation function using the newly created user object
  await defaultLocation(userObj).catch(err => { res.status(500).send(err.message) });
  db.User.findOne({
    where: {
      id: userObj.id
    },
    include: [db.Location]
  }).then(user => {
    // return data
    console.log(`this is user: ${JSON.stringify(user, null, 2)}`);
    cb(user)
  }).catch(err => { res.status(500).send(err.message) })
}

async function defaultLocation(user) {
  await db.Location.bulkCreate([
    {
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
    }]).catch(err => { res.status(500).send(err.message) })

};


// Export routes for server.js to use.
module.exports = router;
