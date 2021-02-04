// Dependencies
const express = require("express");
const db = require("../models");

// Express router methods
const router = express.Router();

// API route to display all advice as json
router.get("/api/advice", (req, res) => {
    db.Advice.findAll().then(data => {
        const randomAdvice = data[Math.floor(Math.random() * data.length)]
        res.json(randomAdvice);
        console.log(`This is random advice ${JSON.stringify(randomAdvice)}`)
    });

});


router.post("/api/advice/create", (req, res) => {
    db.Advice.create({
        content: req.body.content
    }).then(data => res.json(data)).catch(err => { res.status(500).send(err.message) })
})

module.exports = router;