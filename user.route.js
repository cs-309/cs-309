const User = require("../models/user");
const express = require("express");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

userRouter.post(
  "/register",//formate email valid or not
  check("email").isEmail().withMessage("Please enter a valid email"),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { first_name, last_name, email, password, birthdate, role } =
      req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const useremail = await User.findOne({ email: email })
    if (useremail){
      res.status(500).json({message: "email already exist"})  
  }

    const hash_password = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hash_password,
      birthdate,
      role,
    });

  

    return res.status(201).json({
      user,
    });
  })
);



userRouter.post(
  "/login",//catch errors from begining
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign(
        { user_id: user._id, email: user.email, role: user.role },
        JWT_SECRET_KEY,
        {
          expiresIn: "7d",//7days
        }
      );

      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: "Invalid " });
    }
  })
);

module.exports = userRouter;
