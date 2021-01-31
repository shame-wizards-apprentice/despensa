// const express = require("express");
// const food = require("../models/food.js");

// const router = express.Router();

// // Import the model (location.js) to use its database functions.
// const { Location } = require("../models");

// // Create all our routes and set up logic within those routes where required.
// router.get("/", function (req, res) {
//     res.redirect("/locations/:user_id")

// });

// router.get("/locations/:user_id", (req, res) => {
//     Location.findAll({
//         where: {
//             user_id: req.params.user_id
//         }
//     }).then((data) => {
//         console.log(data);
//         const dbLocationJson = data.map(location => location.toJSON())
//         var hbsObject = { location: dbLocationJson };
//         return res.render("index", hbsObject);
//     })
// });

router.post("/locations/create", (req, res) => {
    if(!req.session.user){
        res.status(401).send("Please login first.")
    }
    Location.create(req.body).then((data) => {
        console.log(data);
        res.send(data);
        res.redirect("/");
    }).catch((err) => {
        if (err) console.log(err.message)
        res.status(500).send("Internal server error")
    });
});
// router.put("/locations/update/:id", (req, res) => {
//     Location.update(
//         {
//             name: req.body.name,
//             type: req.body.type,
//         },
//         {
//             where: {
//                 id: req.body.id
//             }
//         }
//     ).then((data) => {
//         res.send(data);
//         res.redirect("/");
//     }).catch((err) => {
//         if (err) console.log(err.message)
//         res.status(500).send("Internal server error")
//     });
// });

// router.delete("locations/delete/:id", function (req, res) {
//     Location.destroy({
//         where: {
//             id: req.params.id
//         }
//     }).then(function (data) {
//         res.send(data);
//         res.redirect("/");
//     }).catch((err) => {
//         if (err) console.log(err.message)
//         res.status(500).send("Internal server error")
//     });
// });
// // Export routes for server.js to use.
// module.exports = router;