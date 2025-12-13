const express = require("express");
const Enquiry = require("../../model/Enquiry");
const Expense = require("../../model/Expense");

const router = express.Router();

const getAllExpenses = router.get(
  "/api/expenses",
  async (req, res) => {
    try {
      const data = await Expense.find();

      return res.send(data); //send the data to the front end to be displayed in the table in the front end page for the student to see the reciepts of the assessment they have made for the school year they have selected in the front end page.
    } catch (error) {
      return res.status(200).json({
        message: "Server Error",
      });
    }
  }
);

module.exports = getAllExpenses;
