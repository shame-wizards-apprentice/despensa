<<<<<<< HEAD
// Dependencies
const express = require("express");
const { Food } = require("../models");

// Express router methods
const router = express.Router();


// Routes
// Homepage route
router.get("/", (req, res) => {
    res.render("index", {});
});

// Display all foods belonging to logged in user
router.get("/foods", (req, res) => {
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
router.post("/foods/create", (req, res) => {
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
router.put("/foods/update/:id", (req, res) => {
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
router.delete("foods/delete/:id", (req, res) => {
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
=======
// var express = require("express");
// const food = require("../models/food.js");

// var router = express.Router();

// // Import the model (User.js) to use its database functions.
// var { Food } = require("../models");

// // Create all our routes and set up logic within those routes where required.
// router.get("/", function (req, res) {
//     res.redirect("/foods");
// });
// router.get("/foods", function (req, res) {
//     Food.findAll({
//         where: {
//             user_id: req.params.user_id
//         }
//     })
//         .then(function (dbFood) {
//             console.log(dbFood);
//             const dbFoodsJson = dbFood.map(food => food.toJSON())
//             var hbsObject = { food: dbFoodJson };
//             return res.render("index", hbsObject);
//         })
// });

// router.post("/foods/create", function (req, res) {
//     Food.create({
//         name: req.body.name,
//         brand: req.body.brand,
//         use_by_date: req.body.use_by_date
//     }).then(function (dbFood) {
//         console.log(dbFood)
//         res.redirect("/");
//     }).catch(err => {
//         res.status(500).send(err.message);
//     });
// });
// router.put("/foods/update/:id", function (req, res) {
//     Food.update(
//         {
//             name: req.body.name,
//             brand: req.body.brand,
//             use_by_date: req.body.use_bye_date
//         },
//         {
//             where: {
//                 id: req.body.id
//             }
//         }
//     ).then(function (dbFood) {
//         res.json("Fresh Food!");
//         res.redirect("/foods");
//     }).catch(err => {
//         res.status(500).send(err.message);
//     });
// });

// router.delete("foods/delete/:id", function (req, res) {
//     Food.destroy({
//         where: {
//             id: req.params.id
//         }
//     }).then(function (dbFood) {
//         res.json(dbFood);
//     }).catch(err => {
//         res.status(500).send(err.message);
//     });
// });
// // Export routes for server.js to use.
// module.exports = router;
>>>>>>> dev
