var express = require("express");
const food = require("../models/food.js");

var router = express.Router();

// Import the model (User.js) to use its database functions.
var { Food } = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    res.redirect("/foods");
});
router.get("/foods", function (req, res) {
    Food.findAll({
        where: {
            user_id: req.params.user_id
        }
    })
        .then(function (dbFood) {
            console.log(dbFood);
            const dbFoodsJson = dbFood.map(food => food.toJSON())
            var hbsObject = { food: dbFoodJson };
            return res.render("index", hbsObject);
        })
});

router.post("/foods/create", function (req, res) {
    Food.create({
        name: req.body.name,
        brand: req.body.brand,
        use_by_date: req.body.use_by_date
    }).then(function (dbFood) {
        console.log(dbFood)
        res.redirect("/");
    }).catch(err => {
        res.status(500).send(err.message);
    });
});
router.put("/foods/update/:id", function (req, res) {
    Food.update(
        {
            name: req.body.name,
            brand: req.body.brand,
            use_by_date: req.body.use_bye_date
        },
        {
            where: {
                id: req.body.id
            }
        }
    ).then(function (dbFood) {
        res.json("Fresh Food!");
        res.redirect("/foods");
    }).catch(err => {
        res.status(500).send(err.message);
    });
});

router.delete("foods/delete/:id", function (req, res) {
    Food.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (dbFood) {
        res.json(dbFood);
    }).catch(err => {
        res.status(500).send(err.message);
    });
});
// Export routes for server.js to use.
module.exports = router;
