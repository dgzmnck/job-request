const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Request = require("../models/request");
const Office = require("../models/office");
const passport = require("passport");
const catchAsync = require("../utils/catchAsync"); //own middleware for catching errors
const { isLoggedIn } = require("../middlewares");

router.get("/", async (req, res) => {
  res.render("");
});

router.get("/users", async (req, res) => {
  const users = await User.find({})
    .sort({ last: 1, first: 1 })
    .populate("office");
  res.render("users/index", { users });
});

router.get("/register", async (req, res) => {
  const offices = await Office.find({});
  res.render("users/register", { offices });
});

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  async (req, res) => {
    console.log(req.user);
    req.flash("success", "you are logged in now");
    res.redirect("/profile");
  }
);

router.get("/profile", isLoggedIn, async (req, res) => {
  // const user = await User.findById(req.user._id);
  // res.render("users/profile", { user });.

  const requests = await Request.find({ requester: req.user._id });
  const user = await User.findById(req.user._id).populate("office");
  console.log(requests);
  res.render("users/profile", { user, requests });
});

router.get("/profile/requests/:status", isLoggedIn, async (req, res) => {
  const { status } = req.params;
  const user = await User.findById(req.user._id);

  if (status) {
    if (status === "all") {
      const requests = await Request.find({ requester: req.user._id }).populate(
        {
          path: "requester",
          populate: {
            path: "office",
          },
        }
      );
      console.log("loading", requests.requester);
      return res.render("users/profile", { user, requests, status });
    } else {
      const requests = await Request.find({
        requester: req.user._id,
        status,
      }).populate({
        path: "requester",
        populate: {
          path: "office",
        },
      });
      console.log("loading", requests.requester);
      return res.render("users/profile", { user, requests, status });
    }
  }
});

router.get("/logout", (req, res) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    req.flash("success", "logged you out");
    res.redirect("/");
  });
});

router.post(
  "/register",
  catchAsync(async (req, res) => {
    try {
      const { first, last, office, password, username } = req.body;
      const user = new User({ first, last, username, office });
      const newUser = await User.register(user, password);

      req.login(newUser, (err) => {
        if (err) return next(err);
        req.flash("error", "Registered and loggedin");
        res.redirect("/users");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/register");
    }
  })
);

router.post("/new", async (req, res) => {
  const { username, first, last, office } = req.body;
  const user = new User({ username, first, last });

  const found_office = await Office.findById(office);
  user.office = found_office;
  await user.save();
  console.log(user);
  console.log(found_office);
  res.redirect("/users");
});

// router.post(
//   passport.authenticate("local", {
//     failureFlash: true,
//     failureRedirect: "/login",
//   }),
//   users.login
// );

module.exports = router;
