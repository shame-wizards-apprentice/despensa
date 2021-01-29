var express = require("express");
const {Container} = require("../models/");

var router = express.Router();

// Import the model (User.js) to use its database functions.
var Container = require("../models/container.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
	res.redirect("/containers");

});
router.get("/containers", function(req,res) {
    Container.findAll()
    .then(function(dbContainer) {
        console.log(dbContainer);
        const dbContainersJson = dbContainer.map(Container=>Container.toJSON())
        var hbsObject = {Container: dbContainerJson};
        return res.render("index",hbsObject);
    }).catch(err => {
        res.status(500).send(err.message);
    }); 
});

router.post("/containers/create", function(req, res) {
  Container.create({

      type: req.body.type,
      description: req.body.description,
      
    }).then(function(dbContainer){
        console.log(dbContainer)
		res.redirect("/");
	}).catch(err => {
        res.status(500).send(err.message);
    }); 
});
router.put("/containers/update/:id", function(req, res) {
    Container.update(
        {
            type: req.body.type,
            description: req.body.description
        },
        {
            where: {
            id: req.body.id
        }
      }).then(function(newContainer){
        res.json("Container created.");
    }).catch(err => {
        res.status(500).send(err.message);
    }); 
});      

router.delete("containers/delete/:id", function (req, res) {
    Container.destroy({
        where:{
            id:req.params.id
        }
    }).then(function(dbContainer) {
        res.json(dbContainer);
    }).catch(err => {
        res.status(500).send(err.message);
    }); 
});
// Export routes for server.js to use.
module.exports = router;
