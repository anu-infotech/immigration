const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tieUp: { type: {}, required: true },
  country: { type: {}, required: true },
});

const Log = mongoose.model("logs", logSchema);

module.exports = Log;
