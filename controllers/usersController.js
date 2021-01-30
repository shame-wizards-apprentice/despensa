var express = require("express");

const router = express.Router();

// Import the model (User.js) to use its database functions.
const { User } = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get('/', function(req, res) {
	res.render("index", {});
});

// Create Route
router.post("/signup", function (req, res) {
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
// Update Route
// router.put("/users/update/:id", (req, res) => {
//     User.update(
//         {
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password

//         },
//         {
//             where: {
//                 id: req.body.id
//             }
//         }).then((data) => {
//             console.log(data)
//             res.send("User settings updated.");
//         }).catch(err => {
//             res.status(500).send(err.message);
//         });
// });
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


// Export routes for server.js to use.
module.exports = router;
