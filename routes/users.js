const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Office = require("../models/office");
const passport = require("passport");

router.get("/", async (req, res) => {
  const users = await User.find({});
  console.log(users);
  res.render("users/index", { users });
});

router.get("/new", async (req, res) => {
  const offices = await Office.find({});
  res.render("users/new", { offices });
});

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
