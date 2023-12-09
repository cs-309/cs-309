const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

//add review
router.post("/", async (req, res) => {
    const newreview = new Review(req.body);

    try {
        const savereview = await newreview.save();
        res.status(200).json(savereview);
    } catch (err) {
        res.status(401).json(err);
    }
});

module.exports = router;