const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  university: {},
  program: String,
  duration: Number,
  courseContentLink: String,
  applicationFee: Number,
  ielts: { type: String, default: "N/A" },
  pte: { type: String, default: "N/A" },
  toefl: { type: String, default: "N/A" },
  gre: { type: String, default: "N/A" },
  gmat: { type: String, default: "N/A" },
  sat: { type: String, default: "N/A" },
  tuitionFee: Number,
  applicationLink: String,
  campus: String,
  graduateType: {},
  entryRequirement: String,
  intake: [],
});

const Course = mongoose.model("courses", courseSchema);

module.exports = Course;
