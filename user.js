const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { JWT_SECRET_KEY } = require("../config/config");

const userScheme = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthdate: {
      type: Date,
      min: "1900-01-01",
      max: Date.now,
    },
    role: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("User", userScheme);
