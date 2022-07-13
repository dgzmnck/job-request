const express = require("express");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();
const Request = require("../models/request");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");

router.get(
  "/",
  catchAsync(async (req, res) => {
    const requests = await Request.find({})
      .sort({ createdAt: 1 })
      .populate("requester");

    res.render("requests", { requests });
  })
);

router.get(
  "/today",
  catchAsync(async (req, res) => {
    const pending = await Request.find({ status: "pending" })
      .sort({ createdAt: 1 })
      .populate("requester")
      .populate("personnel");

    const completed = await Request.find({ status: "completed" })
      .sort({ createdAt: 1 })
      .populate("requester")
      .populate("personnel");

    const accepted = await Request.find({ status: "accepted" })
      .sort({ createdAt: 1 })
      .populate("requester")
      .populate("personnel");

    res.render("requests/today", { pending, accepted, completed });
  })
);

router.post("/", async (req, res) => {
  const user = await User.findById(req.user._id).populate("office");
  const newR = new Request(req.body);
  newR.status = "pending";
  newR.requester = req.user;
  console.log(user);
  newR.office = user.office.name;
  newR.office_code = user.office.code;
  await newR.save();
  req.flash("success", "Successfully created a request");
  res.redirect("/profile");
});

router.get("/status/:status", async (req, res) => {
  const { status } = req.params;
  console.log(status);
  if (status === "all") {
    const requests = await Request.find({}).populate("requester");
    console.log(requests);

    res.render("requests", { requests });
  } else {
    const requests = await Request.find({ status }).populate("requester");
    console.log(requests);
    res.render("requests", { requests });
  }
  // res.send('prams');
});

router.get("/new", isLoggedIn, (req, res) => {
  res.render("requests/new");
});
router.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const r = await Request.findById(id);
  console.log(r);
  res.render("requests/edit", { r, categories });
});

router.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const r = await Request.findById(id);
  console.log(r);
  res.render("requests/edit", { r, categories });
});

router.patch("/:requestId/:userId/accept", isLoggedIn, async (req, res) => {
  const { requestId, userId } = req.params;
  const r = await Request.findById(requestId);
  const u = await User.findById(userId);
  r.personnel.push(u._id);
  r.status = "accepted";
  await r.save();
  req.flash("do the thing");

  res.redirect("/profile");
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const r = await Request.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  console.log(r);
  res.redirect(`/requests/${r._id}`);
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedRequest = await Request.findByIdAndDelete(id);
  res.redirect(`/requests`);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const r = await Request.findById(id);
  console.log(r);
  res.render("requests/show", { r });
});

module.exports = router;
