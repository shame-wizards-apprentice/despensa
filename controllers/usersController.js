var express = require("express");

var router = express.Router();

// Import the model (User.js) to use its database functions.
var User = require("../models/User.js");

// Create all our routes and set up logic within those routes where required.
router.get("/users", function(req, res) {
	res.render("index",
		{
			theme: "cute",
			user: {
				name: "Leora Harlyn",
				email: "leora@dinonite.com",
			},
			locations: [
				{
					name: "Kitchen Fridge",
					type: "Refridgerator",
					containers: [
						{
							type: "Bin",
							description: "Bottom left"
						},
						{
							type: "Bin",
							description: "Bottom right"
						},
						{
							type: "Shelf",
							description: "Middle left"
						}
					]
				},
				{
					name: "Kitchen Freezer",
					type: "Freezer",
					containers: [
						{
							type: "Bin",
							description: "Top left"
						},
						{
							type: "Shelf",
							description: "Top right"
						}
					]
				}
			]
		});
  // User.findAll().then(function(data) {
  // 	// send object back to index to use with handlebars
  //   res.render("index", {user: data});

  // }).catch(err => {
  // 	res.status(500).send(err.message);

  // });
});

router.post("/api/users", function(req, res) {
  User.create(req.body).then(data => {
		res.json(data);
	});
});

router.put("/api/users/:id", function(req, res) {

  User.update(req.body, {
    where: {
      id: req.body.id
    }
  }).then(data => {
    res.json(data);

  }).catch(err => {
    res.status(500).send(err.message);

  });
});

// Export routes for server.js to use.
module.exports = router;
