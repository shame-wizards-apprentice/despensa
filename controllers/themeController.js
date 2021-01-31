// Dependencies
const express = require("express");
const { Theme } = require("../models");

// Express router methods
const router = express.Router();

// API route to display all themes as json
router.get("/api/themes", (req, res) => {
    Theme.findAll()
        .then(data => {
            res.json(data)
        })
});