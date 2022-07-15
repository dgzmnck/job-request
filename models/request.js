//just require mongoose but not connect to database
const { number } = require("joi");
const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    for_office: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Office",
      required: true,
    },
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
        "pending",
        "posted",
        "denied",
        "completed",
        "accepted",
        "cancelled",
        "approved",
      ],
    },
    remarks: {
      type: String,
    },
    office: {
      type: String,
    },
    office_code: {
      type: String,
    },
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    personnel: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    date_approved: { type: Date, default: null },
    date_accepted: { type: Date, default: null },
    date_completed: { type: Date, default: null },
    date_denied: { type: Date, default: null },
    date_cancelled: { type: Date, default: null },
    bounty: Number,
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
