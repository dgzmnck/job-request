//OFFICE =================================

const express = require("express");
const { isLoggedIn, isMember } = require("../middlewares");
const router = express.Router();
const Office = require("../models/office");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");

router.get(
  "/home",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const user = await User.findById(req.user._id).populate("office");
    res.render("offices/home", { user });
  })
);

router.get("/", async (req, res) => {
  const offices = await Office.find({});
  res.render("offices/", { offices });
});

router.patch(
  "/:officeId",
  catchAsync(async (req, res) => {
    const { officeId } = req.params;
    console.log(officeId);
    console.log(req.body);
    const { can_accept_request } = req.body;

    const updatedoffice = await Office.findByIdAndUpdate(
      officeId,
      { $set: { can_accept_request } },
      { new: true }
    );
    console.log(updatedoffice);
    req.flash("success", "office updated");
    res.redirect("/offices");
  })
);

router.delete(
  "/:officeId",
  catchAsync(async (req, res) => {
    const { officeId } = req.params;
    await Office.findByIdAndDelete(officeId);
    req.flash("success", "office deleted");
    return res.redirect("/offices");
  })
);

// router.get("/new", (req, res) => {
//   res.render("offices/new");
// });
// router.post("/new", async (req, res) => {
//   const office = new Office(req.body);
//   await office.save();
//   res.redirect("/offices");
// });

// router.post("/approve/:officeID/:userID",async (req, res) => {
//   const  {officeID,userID} =req.params;
//   const office= await Office.findById(officeID);
//   const user = await User.findById(userID);

//   if (office.members.includes(user._id)) {
//   req.flash('error',"already a member")
//   return res.redirect("/offices/new");
//   }
//   user.is_member = true;
//   office.members.push(user._id);
//   await office.save();
//   await user.save();
//   req.flash("success", "new member approved");
//   res.redirect("/offices/new");
// });

// router.get("/home", isLoggedIn,catchAsync(async(req, res) => {
//   const user = await User.findById(req.user._id).populate('office');
//   res.render("offices/home" ,{user});
// }));

// router.get("/:officeID/jobs", isLoggedIn,isMember,catchAsync(async(req, res) => {
//   res.render("offices/jobs" );
// }));

// router.delete("/:officeId",isLoggedIn, async (req, res) => {
//   const {officeId} = req.params;
//   // const offices = await Office.find({officeId});
//   // console.log(offices);
//  await Office.findByIdAndDelete(officeId)
//   req.flash('success','Successfully deleted')
//   res.redirect("/offices");
// });

module.exports = router;
