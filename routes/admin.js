const express = require("express");
const { isLoggedIn, isMember, isAdmin } = require("../middlewares");
const router = express.Router();
const Office = require("../models/office");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");

router.get("/", isLoggedIn, isAdmin, async (req, res, next) => {
  const offices = await Office.find({});
  console.log(offices);
  res.render("admin/dashboard", { offices });
});

router.get("/offices", async (req, res) => {
  const offices = await Office.find({});
  console.log(offices);
  res.render("offices", { offices });
});

router.get("/users", isLoggedIn, isAdmin, async (req, res) => {
  const users = await User.find({})
    .sort({ last: 1, first: 1 })
    .populate("office");
  res.render("users/index", { users });
});

router.get("/offices/new", (req, res) => {
  res.render("offices/new");
});
router.post("/offices/new", async (req, res) => {
  const office = new Office(req.body);
  await office.save();
  res.redirect("/admin/offices");
});

router.post(
  "/:officeID/:userID",
  isLoggedIn,
  isAdmin,
  catchAsync(async (req, res) => {
    const { officeID, userID } = req.params;
    const office = await Office.findById(officeID);
    const user = await User.findById(userID);

    if (office.members.includes(user._id)) {
      req.flash("error", "already a member");
      return res.redirect("/offices/new");
    }
    user.is_member = true;
    office.members.push(user._id);
    await office.save();
    await user.save();
    req.flash("success", "new member approved");
    res.redirect("/admin/users");
  })
);

router.get(
  "/:officeID/jobs",
  isLoggedIn,
  isMember,
  catchAsync(async (req, res) => {
    res.render("offices/jobs");
  })
);

router.delete("/:officeId", isLoggedIn, async (req, res) => {
  const { officeId } = req.params;
  // const offices = await Office.find({officeId});
  // console.log(offices);
  await Office.findByIdAndDelete(officeId);
  req.flash("success", "Successfully deleted");
  res.redirect("/offices");
});

module.exports = router;
