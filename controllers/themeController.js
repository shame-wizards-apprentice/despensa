const express = require("express");
const { Theme } = require("../models");

const router = express.Router();

// API route to display all themes as json
router.get("/api/themes", (req, res) => {
    Theme.findAll()
        .then((data) => {
            res.json(data)
        }).catch((err) => {
            if (err) console.log(err.message);
            res.status(500).send("Internal server error")
        })
});