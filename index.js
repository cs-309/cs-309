require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connect = require("./db/config");
const morgan = require("morgan");
const userRouter = require("./routes/user.route");
const bookRouter = require("./routes/book.route");
//const router = require("./routes/review.route");
const PORT = process.env.PORT;
const app = express();

connect();
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
 
  
});
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));

//app.use(express.json())
//app.use(express.urlencoded({extended: false}))

// post /register => {first_name,last_name,email,password,birthdate,role}



app.use("/user", userRouter);
app.use("/book", bookRouter);
//app.use("/route",router);
