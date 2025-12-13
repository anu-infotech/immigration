const mongoose = require("mongoose");

const recieptSchema = new mongoose.Schema({
  particulars: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  mobile: { type: Number, required: true },
  amount: { type: Number, required: true },
  recieptNumber: { type: Number, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  assessmentId: { type: String, required: true },
});

const Reciept = mongoose.model("reciepts", recieptSchema);

module.exports = Reciept;
