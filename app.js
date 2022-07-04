if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//EXPRESS
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
//REQUIRE MONGOOSE = npm i mongoose
const mongoose = require("mongoose");
//METHOD OVERRIDE = npm i method-override
const methodOverride = require("method-override");

const catchAsync = require("./utils/catchAsync");
//categories
const categories = ["Hardware", "Software", "Network"];

const moment = require("moment");

const flash = require("connect-flash"); // npm i connect-flash   //493
const requestRoutes = require("./routes/requests");
const officeRoutes = require("./routes/offices");
const userRoutes = require("./routes/users");
//INSERT MODELS
const Request = require("./models/request");
const User = require("./models/user");
const Office = require("./models/office");
const e = require("method-override");

const passport = require("passport");
const LocalStrategy = require("passport-local");

//MONGO CONNECTION TO DATABASE
mongoose
  .connect("mongodb://localhost:27017/misRequest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo open");
  })
  .catch((err) => {
    console.log("oh no, Mongo error");
    console.log(err);
  });

//EXPRESS INIT
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public"))); // make public folder accessible //491

app.engine("ejs", ejsMate); //ASSIGN EJS MATE AS ENGINE NOT THE DEFAULT
app.set("view engine", "ejs");
//method override
app.use(methodOverride("_method"));

app.use((req, res, next) => {
  res.locals.moment = moment;
  next();
});

app.use(flash()); //493
app.use(passport.initialize());
app.use(passport.session()); // invoke afterr express session
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.returnUrl = req.session.originalUrl;
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/requests", requestRoutes);
app.use("/offices", officeRoutes);
app.use("/users", userRoutes);

//ROUTES - WILL BE MOVED TO SEPERATE FOLDER
//ACCOUNT
app.get("/account/new", async (req, res) => {
  const offices = await Office.find({});
  res.render("account/create", { offices });
});

app.use("/dashboard", (req, res) => {
  res.render("admin/dashboard");
});

app.get(
  "/",
  catchAsync(async (req, res, next) => {
    res.render("home");
  })
);
//USERS =================================

// STARTING EXPRESS - MUST BE AT THE VERY END
app.listen(3000, () => {
  console.log("Listening on 3000");
});
