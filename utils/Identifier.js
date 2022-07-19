const User = require("../models/user");

module.exports.isCurrentUserAdmin = async (currentUser) => {
  const user = await User.findById(currentUser._id);
  if (user.is_admin === false) {
    return true;
  }
  return false;
};
