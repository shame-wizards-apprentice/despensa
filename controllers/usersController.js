// Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models");

// Express router methods
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    username: "Angel",
    email: "skelliebunnie@gmail.com",
    theme: "metro",
  });
});

// Create Route
router.post("/api/signup", function (req, res) {
  createUser(req.body).then((data) => {
    defaultLocation(data);
  }).catch(err => {
    if (err) console.log(err.message);
    res.status(500).send("Internal server error");
  });
});

// router.post("/api/signup", function (req, res) {
//   User.create({
//     username: req.body.username,
//     email: req.body.email,
//     password: req.body.password,
//     themeId: req.body.themeId,
//   })
//     // ,
//       db.Location.create({
//         name: "Shopping list",
//         type: "list",
//       }, {
//         name: "Pantry",
//         type: "pantry"
//       },
//       ),
//       db.Container.create({
//         type: "shelf",
//       }, {
//         type: "drawer",
//       })
//     .then((data) => {})
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       res.status(500).send(err.message);
//     });
// });

// Login route
router.post("/api/login", (req, res) => {
  db.User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).send("user does not exist...on this app.");
      } else {
        if (bcrypt.compareSync(req.body.password, data.password)) {
          req.session.user = {
            id: data.id,
            username: data.username,
          };
          // res.json(data);
          res.render("profile", { user: req.session.user });
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

// Sessions route
// router.get("/readsessions", (req, res) => {
// 			// no need to do anything
//     }).then((data) => {
//         res.json(data)
//     }).catch(err => {
//         res.status(500).send(err.message);
//     });
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
    .catch((err) => {
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
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
  console.log("success");
});

async function createUser(data) {
  let userObj = await db.User.create({
    username: data.username,
    email: data.email,
    password: data.password,
    ThemeId: data.ThemeId,
  });
  return userObj;
}

const locationArray = [{}];
async function defaultLocation(userObj) {
  let locationObj = await db.Location.create(
    {
      name: "Shopping list",
      type: "list",
      userId: `${userObj.id}`,
    },
    {
      name: "Pantry",
      type: "pantry",
      userId: `${userObj.id}`,
    },
    {
      name: "Refrigerator",
      type: "refrigerator",
      userId: `${userObj.id}`,
    },
    {
      name: "Freezer",
      type: "freezer",
      userId: `${userObj.id}`,
  })
  return locationObj.then((locationObj) => {
  locationArray.push(locationObj)}).catch(err=>console.log(err))
  .then(defaultContainer(locationArray))
  .catch(err=>console.log(err));
    
}; 

  async function defaultContainer(locationArray) {
  let containerObj = await db.container
    .create(
      {
        type: "shelf",
      },
      {
        type: "drawer",
      }
    )
    .then(locationArray.map(function (containerObj) {
        if (err) throw err;
        return containerObj;
      })
    );
  };

// Export routes for server.js to use.
module.exports = router;
