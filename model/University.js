const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  tieUp: { type: {}, required: true },
  country: { type: {}, required: true },
});

const University = mongoose.model("universities", universitySchema);

module.exports = University;
