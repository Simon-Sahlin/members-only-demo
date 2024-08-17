require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");

const path = require("node:path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
require("./authentication");
app.use(express.urlencoded({ extended: true }));



const indexRouter = require("./routes/indexRouter");
const userRouter = require("./routes/userRouter");

app.use("/", userRouter);
app.use("/", indexRouter);


const PORT = process.env.PORT || 6969;
app.listen(PORT, ()=> console.log(`YIPPI!! Express app - listening on port ${PORT}`));