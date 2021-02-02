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
  createUser(req.body, function (data) {
    res.json(data);
  })
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

async function createUser(data, cb) {
  let userObj = await db.User.create({
    username: data.username,
    email: data.email,
    password: data.password,
    ThemeId: data.ThemeId,
  });

  await defaultLocation(userObj).catch(err => console.log(err));
  db.User.findOne({
    where: {
      id: userObj.id
    },
    include: [db.Location, db.Container]
  }).then(user => {
    // return data
    console.log(`this is user: ${JSON.stringify(user, null, 2)}`);
    cb(user)
  })
}

// Maybe we need to map location on to user object after location is created

async function defaultLocation(user) {
  let locationObj = await db.Location.bulkCreate([
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
    }])
  // console.log(`This is location object: ${JSON.stringify(locationObj, null, 2)}`)
  let locationArray = locationObj;
  await defaultContainer(locationArray).catch(err => console.log(err));
  // console.log("==================================================")

};

async function defaultContainer(locationArray) {
  // console.log(`This is location array: ${JSON.stringify(locationArray, null, 2)}`)

  let noList = locationArray.filter(obj => obj.type != "list")
  // console.log(`this is noList: ${JSON.stringify(noList)}`)

  for (i = 0; i < noList.length; i++) {
    db.Container.bulkCreate([{
      type: "shelf",
      description: "it's a shelf, yo",
      UserId: `${noList[i].UserId}`,
      LocationId: `${noList[i].id}`
    },
    {
      type: "drawer",
      description: "it's a drawer, yo",
      UserId: `${noList[i].UserId}`,
      LocationId: `${noList[i].id}`
    }]).catch(err => console.log(err))
  }

};

// let containerObj = await db.Container.create({
//   type: "shelf",
// },
//   {
//     type: "drawer",
//   }
// )
// return containerObj.then(locationArray.map(function (containerObj) {
//   if (err) throw err;
// })).catch(err => {
//   if (err) throw err
// });


// Export routes for server.js to use.
module.exports = router;
