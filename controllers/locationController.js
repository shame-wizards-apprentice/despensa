// Dependencies
const express = require("express");
const { Location, Food } = require("../models");

// Express router methods
const router = express.Router();


// // Create all our routes and set up logic within those routes where required.
// router.get("/", function (req, res) {
//     res.redirect("/locations/:userId")

// });

// Display all locations owned by user
router.get("api/locations/:userId", (req, res) => {
    if (!req.sessions.user) {
        res.status(401).send("Oops, I'm sorry! I'm not supposed to talk to strangers.")
    }
    else {
        Location.findAll({
            where: {
                userId: req.sessions.userId
            }
        }).then(data => {
            console.log(data);
            const dbLocationJson = data.map(location => location.toJSON())
            var hbsObject = { location: dbLocationJson };
            return res.render("index", hbsObject);
        }).catch(err => { res.status(500).send(err.message) })

    }

});

// Create a new location if user is logged in
router.post("api/locations/create", (req, res) => {
    if (!req.session.user) {
        res.status(401).send("Oops, I'm sorry! I'm not supposed to talk to strangers.")
    }
    else {
        Location.create({
            name: req.body.name,
            type: req.body.type,
            userId: req.session.user.id
        }).then(data => {
            console.log(data);
            res.send(data);
            res.redirect("/");
        }).catch(err => { res.status(500).send(err.message) });

    }

});

// Update user's locations if logged in
router.put("api/locations/update/:id", (req, res) => {
    if (!req.sessions.user) {
        res.status(401).send("Oops, I'm sorry! I'm not supposed to talk to strangers.")
    }
    else {
        Location.update(
            {
                name: req.body.name,
                type: req.body.type,
                userId: req.session.user.id
            },
            {
                where: {
                    id: req.body.id
                }
            }
        ).then(data => {
            res.send(data);
            res.redirect("/");
        }).catch(err => { res.status(500).send(err.message) });

    }

});

// Delete a location, if user is logged in
router.delete("api/locations/delete/:id", (req, res) => {
    if (!req.sessions.user) {
        res.status(401).send("Oops, I'm sorry! I'm not supposed to talk to strangers.")
    }
    else {
        Location.destroy({
            where: {
                userId: req.sessions.user.id,
                id: req.params.id
            }
        }).then(data => {
            res.send(data);
            res.redirect("/");
        }).catch(err => { res.status(500).send(err.message) });

    }

});

// Export routes for server.js to use.
module.exports = router;
