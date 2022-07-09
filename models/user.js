//just require mongoose but not connect to database
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const ImageSchema = new Schema({
  url: String,
  filename: String,
});


ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const UserSchema = new Schema(
  {
    first: {
      type: String,
      required: true,
    },
    last: {
      type: String,
      required: true,
    },
    email : {
      type:String,
    
      unique:true,
    },
    office: { type: mongoose.Schema.Types.ObjectId, ref: "Office" },
    picture: ImageSchema,
    position: {
      type: String,
    },
    is_member:Boolean,
    can_serve: Boolean,
    is_head: Boolean,
  },
  { timestamps: true }
);

UserSchema.virtual("fullname").get(function () {
  return `${this.first} ${this.last}
  `;
});


UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);

module.exports = User;
