const express = require("express");
const { isLoggedIn, isMember } = require("../middlewares");
const router = express.Router();
const Office = require("../models/office");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");

router.get("/", (req, res) => {
  res.render("/category");
});
