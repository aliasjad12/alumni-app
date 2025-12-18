const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  medicalIssue: { type: String, required: true },
  tenure: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Issue", issueSchema);
