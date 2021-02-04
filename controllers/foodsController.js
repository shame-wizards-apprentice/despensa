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
  } else {
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
  } else {
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
  } else {
  	let foodObj = {};
  	if(req.body.name !== null && req.body.name !== "") {
  		foodObj.name = req.body.name;
  	}
  	if(req.body.brand !== null && req.body.brand !== "") {
  		foodObj.brand = req.body.brand;
  	}
  	if(req.body.expirationDate !== null && req.body.expirationDate !== "") {
  		foodObj.expirationDate = req.body.expirationDate;
  	}
  	if(req.body.isCheese !== null && req.body.isCheese !== "") {
  		foodObj.isCheese = req.body.isCheese;
  	}
  	if(req.body.amount !== null && req.body.amount !== "") {
  		foodObj.amount = req.body.amount;
  	}
  	if(req.body.LocationId !== null && req.body.LocationId !== "") {
  		foodObj.LocationId = req.body.LocationId;
  	}

    db.Food.update(foodObj, {
      where: {
        userId: req.session.user.id,
        id: req.params.id
      }
    }).then(data => {
      res.json(data);
    }).catch(err => { res.status(500).send(err.message); });

  }

});

// Delete a food
router.delete("/api/foods/delete/:id", (req, res) => {
  if (!req.session.user) {
    res.status(401).send("Oops, I'm sorry! I'm not supposed to talk to strangers.")
  } else {
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