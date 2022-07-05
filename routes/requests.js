const express = require("express");
const router = express.Router();
const Request = require("../models/request");

router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    console.log(category);
    if (category) {
      const requests = await Request.find({})
        .sort({ createdAt: 1 })
        .populate("requester");
      res.render("requests", { requests, category });
    } else {
      const requests = await Request.find({})
        .sort({ createdAt: 1 })
        .populate("requester");
      res.render("requests", { requests, category: "All" });
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/new", (req, res) => {
  res.render("requests/new");
});

router.post("/", async (req, res) => {
  const newR = new Request(req.body);
  await newR.save();
  res.redirect("/requests");
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
