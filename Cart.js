const { verifyToken, Token_Authorization, Token_Admin } = require("./verifyToken");
const Cart = require("../models/Cart");//avoid error to use it logically 
const express = require("express");
const router = express.Router();

//add new cart
router.post("/new", verifyToken, async (req, res) => {
    const newcart = new Cart(req.body);

    try {
        const savecart = await newcart.save();
        res.status(200).json(savecart);
    } catch (err) {
        res.status(401).json(err);//bad request , 404:not found
    }
});

//delete Cart
router.delete("/:id", Token_Authorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("cart deleted successifly");
    } catch (err) {
        res.status(401).json({ err: "you cant delete"});
    }
});


//get all CartS
router.get("/", Token_Admin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(401).json({ err: "no carts found"});
    }
});

//get only one usercart by id
router.get("/find/:userId", Token_Authorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(cart);
    } catch (err) {
        res.status(401).json({ err: "cart does not exist"});
    }
});


module.exports = router;