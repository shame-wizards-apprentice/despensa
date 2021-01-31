// Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models");

// Express router methods 
const router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get('/', (req, res) => {
    res.render("index", {});
});

// Signup route
router.post("/signup", (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        theme_id: req.body.theme_id
    }).then((data) => {
        res.json(data)
    }).catch(err => {
        res.status(500).send(err.message);
    });
});

// Login route
router.post("/login", (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then((data) => {
        if (!data) {
            res.status(404).send("user does not exist...on this app.")
        } else {
            if (bcrypt.compareSync(req.body.passowrd, data.password)) {
                req.session.user = {
                    id: data.id,
                    username: data.username
                }
                res.json(data);
            } else {
                res.status(401).send("Ah ah ah! You didn't say the magic word...")
            }
        }
    });

});

// Sessions route
router.get("/readsessions", (req, res) => {
    res.json(req.session)
})

// Test Route
router.get("/lardersquadVIP", (req, res) => {
    if (req.session.user) {
        res.send(`    You are part of an exceptional group of people, ${req.session.user.username}.`)
    } else {
        res.status(401).send("login required.")
    }
});

// Update route
router.put("/users/update/:id", (req, res) => {
    User.update(
        {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            theme_id: req.body.theme_id

        },
        {
            where: {
                id: req.body.id
            }
        }).then((data) => {
            console.log(data)
            res.send("User settings updated.");
        }).catch(err => {
            res.status(500).send(err.message);
        });
});
Delete Route
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


// Export routes for server.js to use.
module.exports = router;
