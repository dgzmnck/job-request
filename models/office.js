//just require mongoose but not connect to database
const mongoose = require("mongoose");
const User = require("./user");

const officeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    head: {
      type: String,
      required: true,
    },
    can_accept_request: { type: Boolean },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

officeSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await User.updateMany(
      { _id: { $in: doc.members } },
      {
        $set: {
          office: null,
          is_member: null,
          is_personnel: null,
          is_head: null,
        },
      },
      function (err, val) {
        if (err) {
          return console.log(err);
        } else {
          return console.log(val);
        }
      }
    );
  }
});

module.exports = mongoose.model("Office", officeSchema);
