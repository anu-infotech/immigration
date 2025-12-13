const express = require("express");
const Enquiry = require("../../model/Enquiry");
const Expense = require("../../model/Expense");
const router = express.Router();

const createExpenseRouter = router.post(
  "/api/expense/add",
  async (req, res) => {
    const {
      particulars,
      name,
      address,
      mobile,
      recieptNumber,
      assessmentId,
      amount,
     
    } = req.body;
    try {
      await Expense.create(
        {
          particulars,
          name,
          address,
          mobile,
          recieptNumber,
          assessmentId,
          amount,
          date: Date.now()
        },
        (err, doc) => {
          console.log(err)
          if (err) return res.status(400).send("Something Went wrong");
          return res.send(doc);
        }
      );
    } catch (error) {
      console.log(error);
      res.send("something went wrong");
    }
  }
);

module.exports = createExpenseRouter;
