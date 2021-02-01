// Dependencies
const express = require("express");
const { Food } = require("../models");

// Express router methods
const router = express.Router();


// Routes

// Display all foods belonging to logged in user
router.get("api/foods", (req, res) => {
    if (!req.session.user) {
        res.status(401).send("The cake is a lie")
    }
    else {
        Food.findAll({
            where: {
                user_id: req.session.user.id
            }
        })
            .then(dbFood => {
                console.log(dbFood);
                const dbFoodsJson = dbFood.map(food => food.toJSON())
                var hbsObject = { food: dbFoodsJson };
                return res.render("index", hbsObject);
            })

    }

});

// Add a new food
router.post("api/foods/create", (req, res) => {
    if (!req.session.user) {
        res.status(401).send("The cake is a lie")
    }
    else {
        Food.create({
            name: req.body.name,
            brand: req.body.brand,
            days_to_use: req.body.days_to_use,
            isCheese: req.body.isCheese,
            amount: req.body.amount,
            user_id: req.session.user.id
        }).then(data => {
            res.json(data);
            res.redirect("/foods");
        }).catch(err => {
            res.status(500).send(err.message);
        });

    }

});

// Update food stats
router.put("api/foods/update/:id", (req, res) => {
    if (!req.session.user) {
        res.status(401).send("The cake is a lie")
    }
    else {
        Food.update({
            name: req.body.name,
            brand: req.body.brand,
            days_to_use: req.body.days_to_use,
            isCheese: req.body.isCheese,
            amount: req.body.amount,
            user_id: req.session.user.id
        },
            {
                where: {
                    user_id: req.session.user.id,
                    id: req.body.id
                }
            }
        ).then(data => {
            res.json(data);
            res.redirect("/foods");
        }).catch(err => {
            res.status(500).send(err.message);
        });

    }

});

// Delete a food
router.delete("api/foods/delete/:id", (req, res) => {
    if (!req.session.user) {
        res.status(401).send("The cake is a lie")
    }
    else {
        Food.destroy({
            where: {
                user_id: req.session.user.id,
                id: req.params.id
            }
        }).then(data => {
            res.json(data);
            res.redirect("/foods");
        }).catch(err => {
            res.status(500).send(err.message);
        });

    }

});
// Export routes for server.js to use.
module.exports = router;
