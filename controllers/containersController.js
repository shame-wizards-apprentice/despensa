// Dependencies 
const express = require("express");
const { Container } = require("../models");

// Express router methods
const router = express.Router();

// Routes

// Display all of user's containers
router.get("api/containers", (req, res) => {
    if (!req.session.user) {
        res.status(401).send("Go get your own")
    }
    else {
        Container.findAll({
            where: {
                userId: req.session.user.id
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
router.post("api/containers/create", (req, res) => {
    if (!req.session.user) {
        res.status(401).send("Go get your own")
    }
    else {
        Container.create({

            type: req.body.type,
            description: req.body.description,
            locationId: req.body.locationId,
            userId: req.session.user.id,

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
router.put("api/containers/update/:id", (req, res) => {
    if (!req.session.user) {
        res.status(401).send("Go get your own")
    }
    else {
        Container.update({
            type: req.body.type,
            description: req.body.description,
            locationId: req.body.locationId,
            userId: req.session.user.id
        },
            {
                where: {
                    userId: req.session.user.id,
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
router.delete("api/containers/delete/:id", (req, res) => {
    if (!req.session.user) {
        res.status(401).send("Go get your own")
    }
    else {
        Container.destroy({
            where: {
                userId: req.session.user.id,
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