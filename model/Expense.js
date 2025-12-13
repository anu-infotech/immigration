const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
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

const Expense = mongoose.model("expenses", expenseSchema);

module.exports = Expense;
