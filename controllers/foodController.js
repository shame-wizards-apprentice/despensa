var express = require("express");
const food = require("../models/food.js");

var router = express.Router();

// Import the model (User.js) to use its database functions.
var Food = require("../models/food.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
	res.redirect("/foods");

});
router.get("/foods", function(req,res) {
    Food.findAll()
    .then(function(dbFood) {
        console.log(dbFood);
        const dbFoodsJson = dbFood.map(food=>food.toJSON())
        var hbsObject = {food: dbFoodJson};
        return res.render("index",hbsObject);
    });
});

router.post("/foods/create", function(req, res) {
  Food.create({
      name: req.body.name,
      brand: req.body.brand,
      use_by_date: req.body.use_by_date
    }).then(function(dbFood){
        console.log(dbFood)
		res.redirect("/");
	});
});
router.put("/foods/update/:id", function(req, res) {
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
      ).then(function(newFood){
        res.json("Fresh Food!");
    });
});      

router.delete("foods/delete/:id", function (req, res) {
    Food.destroy({
        where:{
            id:req.params.id
        }
    }).then(function(dbFood) {
        res.json(dbFood);
    });
});
// Export routes for server.js to use.
module.exports = router;
