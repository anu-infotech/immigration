const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
  name: { type: String, required: false, default: null },
  slug: { type: String, required: false, default: null },
});


const Branch = mongoose.model("branches", branchSchema);

module.exports = Branch;
