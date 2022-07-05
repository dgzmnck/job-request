if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//EXPRESS
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const session = require("express-session"); // npm i express-session
const methodOverride = require("method-override"); //METHOD OVERRIDE = npm i method-override
const AppError = require("./utils/AppError"); // self made error handler
const catchAsync = require("./utils/catchAsync"); //own middleware for catching errors
const Joi = require("joi");
const MongoStore = require("connect-mongo");
const mongoSanitize = require("express-mongo-sanitize");
//categories
const categories = ["Hardware", "Software", "Network"];
// const moment = require("moment");
const flash = require("connect-flash"); // npm i connect-flash   //493
const requestRoutes = require("./routes/requests");
const officeRoutes = require("./routes/offices");
const userRoutes = require("./routes/users");
//INSERT MODELS
const Request = require("./models/request");
const User = require("./models/user");
const Office = require("./models/office");

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

app.use(express.urlencoded({ extended: true })); // form to req.body
app.use(express.json());
app.set("views", path.join(__dirname, "views")); //use views folder
app.use(express.static(path.join(__dirname, "public"))); // make public folder accessible //491
app.engine("ejs", ejsMate); //ASSIGN EJS MATE AS ENGINE NOT THE DEFAULT
app.set("view engine", "ejs"); // set view engine
app.use(methodOverride("_method")); //used for overriding post method PUT PATCH DELETE

const sessionConfig = {
  // store: store,
  name: "shesh",
  secret: "secretfromenv",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig)); //using express-session
app.use(flash()); // using connect-flash

app.use(passport.initialize()); //using passport - used for login
app.use(passport.session()); // invoke afterr express session
passport.use(new LocalStrategy(User.authenticate())); // passport using localstrategy
passport.serializeUser(User.serializeUser()); //needed for login or registering
passport.deserializeUser(User.deserializeUser()); //needed for login or registering

app.use((req, res, next) => {
  //middleware - runs every request

  console.log("mid user ", req.user);
  console.log("mid", req.session);
  res.locals.returnUrl = req.session.originalUrl;
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/requests", requestRoutes); // add the request routes
app.use("/offices", officeRoutes); //add the office routes
app.use("/", userRoutes); //add the user routes

const handleValidationErr = (err) => {
  return new AppError(`Validation failed ...${err.message}`, 400);
};

const handleCastErr = (err) => {
  return new AppError(`Validation failed ...${err.message}`, 400);
};

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") err = handleValidationErr(err);
  if (err.name === "CastError") {
    err.status = 404;
    err.message = "page not found";
  }
  next(err);
});

app.all("*", (req, res, next) => {
  next(new AppError("Page not found", 404));
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(status).render("error", { err });
});

//USERS =================================

// STARTING EXPRESS - MUST BE AT THE VERY END
app.listen(3000, () => {
  console.log("Listening on 3000");
});
