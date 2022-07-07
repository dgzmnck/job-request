//OFFICE =================================

const express = require("express");
const router = express.Router();
const Office = require("../models/office");

router.get("/", async (req, res) => {
  const offices = await Office.find({});
  console.log(offices);
  res.render("offices/", { offices });
});

router.get("/new", (req, res) => {
  res.render("offices/new");
});

router.post("/new", async (req, res) => {
  const office = new Office(req.body);
  await office.save();
  res.redirect("/offices");
});

module.exports = router;
