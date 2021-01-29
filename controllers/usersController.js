var express = require("express");

var router = express.Router();

// Import the model (User.js) to use its database functions.
const { User } = require("../models");

// Create all our routes and set up logic within those routes where required.
// Read Route
router.get("/", function (req, res) {
    res.redirect("/Users");
});
router.get("/Users", function (req, res) {
    User.findAll({
        where: {
            name: req.body.name,
            id: req.params.id
        }
    })
        .then(function (dbUser) {
            console.log(dbUser);
            const dbUsersJson = dbUser.map(User => User.toJSON())
            var hbsObject = { User: dbUserJson };
            return res.render("index", hbsObject);
        })
});
// Create Route
router.post("/Users/create", function (req, res) {
    User.create({
        name: req.body.name,
        email: req.body.email,
    }).then(function (dbUser) {
        console.log(dbUser)
        res.redirect("/");
    }).catch(err => {
        res.status(500).send(err.message);
    });
});
// Update Route
router.put("/users/update/:id", function (req, res) {
    User.update(
        {
            name: req.body.name,
            email: req.body.email,

        },
        {
            where: {
                id: req.body.id
            }
        }
    ).then(function (dbUser) {
        res.json("User settings updated.");
        res.redirect("/users");
    }).catch(err => {
        res.status(500).send(err.message);
    });
});
// Delete Route
router.delete("users/delete/:id", function (req, res) {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (dbUser) {
        res.json(dbUser);
    }).catch(err => {
        res.status(500).send(err.message);
    });
});


// Export routes for server.js to use.
module.exports = router;
