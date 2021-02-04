// Dependencies
const express = require("express");
const db = require("../models");

// Express router methods
const router = express.Router();

// Routes

// Display all foods belonging to logged in user
router.get("/api/foods", (req, res) => {
    if (!req.session.user) {
        res.status(401).send("Oops, I'm sorry! I'm not supposed to talk to strangers.")
    }
    else {
        db.Food.findAll({
            where: {
                userId: req.session.user.id
            }
        }).then(dbFood => {
            console.log(dbFood);
            const dbFoodsJson = dbFood.map(food => food.toJSON())
            var hbsObject = { food: dbFoodsJson };
            return res.render("index", hbsObject);
        }).catch(err => { res.status(500).send(err.message) })

    }

});

// Add a new food
router.post("/api/foods/create", (req, res) => {
	console.log(req.body);
    if (!req.session.user) {
      res.status(401).send("Oops, I'm sorry! I'm not supposed to talk to strangers.")
    }
    else {
    	let newFood = {
        name: req.body.name,
        brand: req.body.brand,
        expirationDate: req.body.expirationDate,
        isCheese: req.body.isCheese === "true" ? true : false,
        amount: req.body.amount,
        LocationId: parseInt(req.body.locationId),
        UserId: req.session.user.id
      };
      console.log(newFood);
      db.Food.create(newFood).then(data => {
          res.json(data);

      }).catch(err => { 
      	res.status(500).send(err); 

      });
    }
});

// Update food stats
router.put("/api/foods/update/:id", (req, res) => {
    if (!req.session.user) {
        res.status(401).send("Oops, I'm sorry! I'm not supposed to talk to strangers.")
    }
    else {
        db.Food.update({
            name: req.body.name,
            brand: req.body.brand,
            expirationDate: req.body.expirationDate,
            isCheese: req.body.isCheese,
            amount: req.body.amount,
            userId: req.session.user.id
        },
            {
                where: {
                    userId: req.session.user.id,
                    id: req.body.id
                }
            }
        ).then(data => {
            res.json(data);
            res.redirect("/foods");
        }).catch(err => { res.status(500).send(err.message); });

    }

});

// Delete a food
router.delete("/api/foods/delete/:id", (req, res) => {
    if (!req.session.user) {
        res.status(401).send("Oops, I'm sorry! I'm not supposed to talk to strangers.")
    }
    else {
        db.Food.destroy({
            where: {
                userId: req.session.user.id,
                id: req.params.id
            }
        }).then(data => {
            res.json(data);
            res.redirect("/foods");
        }).catch(err => { res.status(500).send(err.message); });

    }

});
// Export routes for server.js to use.
module.exports = router;
