//just require mongoose but not connect to database
const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    nature: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "UIS",
        "Submit Grades",
        "Network/Internet",
        "Website/Posting",
        "Hardware Troubleshooting",
        "Software",
      ],
    },
    status: {
      type: String,
      enum: [
        "awaiting-approval",
        "pending",
        "posted",
        "denied",
        "in-progress",
        "completed",
        "accepted",
      ],
    },
    remarks: {
      type: String,
    },
    office: {
      type: String,
    },
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    personnel: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
