<<<<<<< HEAD
// Dependencies 
const express = require("express");
const { Container } = require("../models");

// Express router methods
const router = express.Router();

// Routes
// Homepage route
router.get("/", function (req, res) {
    res.render("index", {});

});

// Display all of user's containers
router.get("/containers", (req, res) => {
    if (!req.session.user) {
        res.status(401).send("Go get your own")
    }
    else {
        Container.findAll({
            where: {
                user_id: req.session.user.id
            }
        }).then(dbContainer => {
            console.log(dbContainer);
            const dbContainersJson = dbContainer.map(Container => Container.toJSON())
            const hbsObject = { Container: dbContainerJson };
            return res.render("index", hbsObject);
        });

    }

});

// Create a new container
router.post("/containers/create", (req, res) => {
    if (!req.session.user) {
        res.status(401).send("Go get your own")
    }
    else {
        Container.create({

            type: req.body.type,
            description: req.body.description,
            location_id: req.body.location_id,
            user_id: req.session.user.id,

        }).then(dbContainer => {
            console.log("Container created");
            res.json(dbContainer);
            res.redirect("/containers");
        }).catch(err => {
            res.status(500).send(err.message);
        });

    }

});

// Update existing container
router.put("/containers/update/:id", (req, res) => {
    if (!req.session.user) {
        res.status(401).send("Go get your own")
    }
    else {
        Container.update({
            type: req.body.type,
            description: req.body.description,
            location_id: req.body.location_id,
            user_id: req.session.user.id
        },
            {
                where: {
                    user_id: req.session.user.id,
                    id: req.body.id
                }
            }).then(data => {
                res.json(data);
                console.log("Container updated");
                res.redirect("/containers");
            }).catch(err => {
                res.status(500).send(err.message);
            });

    }

});

// Delete a container
router.delete("containers/delete/:id", (req, res) => {
    if (!req.session.user) {
        res.status(401).send("Go get your own")
    }
    else {
        Container.destroy({
            where: {
                user_id: req.session.user.id,
                id: req.params.id
            }
        }).then(data => {
            res.json(data);
            res.redirect("/containers");
            console.log("Container destroyed");
        }).catch(err => {
            res.status(500).send(err.message);
        });

    }

});
// Export routes for server.js to use.
module.exports = router;
=======
// var express = require("express");
// const {Container} = require("../models/");

// var router = express.Router();

// // Import the model (User.js) to use its database functions.
// var { Container } = require("../models");

// // Create all our routes and set up logic within those routes where required.
// router.get("/", function (req, res) {
//     res.redirect("/containers");

// });
// router.get("/containers", function (req, res) {
//     Container.findAll()
//         .then(function (dbContainer) {
//             console.log(dbContainer);
//             const dbContainersJson = dbContainer.map(Container => Container.toJSON())
//             var hbsObject = { Container: dbContainerJson };
//             return res.render("index", hbsObject);
//         });
// });

// router.post("/containers/create", function (req, res) {
//     Container.create({

//         type: req.body.type,
//         description: req.body.description,

//     }).then(function (dbContainer) {
//         console.log(dbContainer)
//         res.redirect("/");
//     }).catch(err => {
//         res.status(500).send(err.message);
//     });
// });
// router.put("/containers/update/:id", function (req, res) {
//     Container.update(
//         {
//             type: req.body.type,
//             description: req.body.description
//         },
//         {
//             where: {
//                 id: req.body.id
//             }
//         }).then(function (newContainer) {
//             res.json("Container created.");
//         }).catch(err => {
//             res.status(500).send(err.message);
//         });
// });

// router.delete("containers/delete/:id", function (req, res) {
//     Container.destroy({
//         where: {
//             id: req.params.id
//         }
//     }).then(function (dbContainer) {
//         res.json(dbContainer);
//     }).catch(err => {
//         res.status(500).send(err.message);
//     });
// });
// // Export routes for server.js to use.
// module.exports = router;
>>>>>>> dev
