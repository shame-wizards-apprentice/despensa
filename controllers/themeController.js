// Dependencies
const express = require("express");
const db = require("../models");

// Express router methods
const router = express.Router();

// API route to display all themes as json
router.get("/api/themes", (req, res) => {
    db.Theme.findAll()
        .then(data => {
            res.json(data)
        }).catch(err => { res.status(500).send(err.message) })
});

// router.put("api/themes/update", (req, res) => {
//     if (!req.session.user) {
//         res.status(401).send("Oops, I'm sorry! I'm not supposed to talk to strangers.")
//     }
//     else {
//         User.update({
//             iconClass: {
//                 type: req.body.type
//             },
//         },
//             {
//                 where: {
//                     userId: req.session.user.id,
//                 }
//             }
//         ).then(data => {
//             res.json(data);
//             res.redirect("/index");
//             // Is this the right place to redirect?
//         }).catch(err => {
//             res.status(500).send(err.message);
//         });

//     }

// });
// Export routes for server.js to use.
module.exports = router;