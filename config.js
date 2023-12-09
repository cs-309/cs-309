
const mongoose = require("mongoose");
const  DB_CONNECTION_STRING  = process.env.DB_CONNECTION_STRING;

const connect = async () => {
  try {
    // mongoose.set("strictQuery", true);
   await mongoose.connect(DB_CONNECTION_STRING);
    console.log("connected to db successful.");
  } catch (err) {
    console.log("error on db connection", err);
    throw err;
  }
};


module.exports = connect;