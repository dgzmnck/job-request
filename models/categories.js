//just require mongoose but not connect to database
const mongoose = require("mongoose");
const Office = require("./office");
const { Schema } = mongoose;
const categorySchema = new Schema(
  {
    office: {
      type: Schema.Types.ObjectId,
      ref: "Office",
      required: true,
    },
    categories: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
