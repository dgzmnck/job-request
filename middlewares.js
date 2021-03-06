const Office = require("./models/office");
const Request = require("./models/request");
const User = require("./models/user");
const AppError = require("./utils/AppError"); // self made error handler

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnUrl = req.originalUrl;
    req.flash("error", "You must be logged in to do this action.");
    return res.redirect("/login");
  }
  next();
};

module.exports.isCurrentUserAdmin = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  console.log(user, user.is_admin);

  if (user.is_admin === false) {
    return true;
  }

  return false;
};

module.exports.isMember = async (req, res, next) => {
  const { officeID } = req.params;
  const office = await Office.findById(officeID);
  const user = await User.findById(req.user._id);

  if (office.members.includes(user._id)) {
    return next();
  }
  req.flash("error", "you are not a member of this office");
  res.redirect("/profile");
};

module.exports.isPersonnel = async (req, res, next) => {
  // const { officeID } = req.params;
  // const office = await Office.findById(officeID);
  const user = await User.findById(req.user._id).populate("office");

  if (user.office.can_accept_request) {
    return next();
  }
  req.flash("error", "Your office do not handle requests");
  res.redirect("/profile");
};

module.exports.isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  console.log(user, user.is_admin);

  if (user.is_admin === false) {
    return next(new AppError(` Not authorized..`, 401));
  }

  return next();
};

module.exports.isOwner = async (req, res, next) => {
  const { requestId } = req.params;
  const r = await Request.findById(requestId);
  if (!r.requester.equals(req.user._id)) {
    req.flash("error", "no permission to edit");
    return res.redirect(req.originalUrl);
  }
  next();
};

// module.exports.isReviewAuthor = async (req, res, next) => {
//   const { id, reviewId } = req.params;
//   const review = await Review.findById(reviewId);
//   if (!review.author.equals(req.user._id)) {
//     req.flash("error", "no permission to do that");
//     return res.redirect(`/campgrounds/${id}`);
//   }
//   next();
// };

// module.exports.validateCampground = (req, res, next) => {
//   console.log("FROM VALIDATE CAMPGROUND");
//   console.log(req.body, req.files);
//   const { error } = campgroundSchema.validate(req.body);
//   if (error) {
//     const msg = error.details.map((el) => el.message).join(",");
//     throw new AppError(msg, 400);
//   } else {
//     next();
//   }
// };
// module.exports.validateReview = (req, res, next) => {
//   const { error } = reviewSchema.validate(req.body);
//   if (error) {
//     const msg = error.details.map((el) => el.message).join(",");
//     throw new AppError(msg, 400);
//   } else {
//     next();
//   }
// };
