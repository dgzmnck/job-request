const express = require("express");
const router = express.Router();
const Request = require("../models/request");
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    if (category) {
      const requests = await Request.find({})
        .sort({ createdAt: 1 })
        .populate("requester");
      res.render("requests", { requests });
    } else {
      const requests = await Request.find({})
        .sort({ createdAt: 1 })
        .populate("requester");
      res.render("requests", { requests });
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/new", (req, res) => {
  res.render("requests/new");
});

router.post("/", async (req, res) => {
  const user = await User.findById(req.user._id).populate("office");
  const newR = new Request(req.body);
  newR.status = "pending";
  newR.requester = req.user;
  console.log(user);
  newR.office = user.office.name;

  await newR.save();
  req.flash("success", "Successfully created a request");
  res.redirect("/profile");
});

router.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const r = await Request.findById(id);
  console.log(r);
  res.render("requests/edit", { r, categories });
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
