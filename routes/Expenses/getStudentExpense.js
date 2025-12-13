const express = require("express");
const Enquiry = require("../../model/Enquiry");
const Expense = require("../../model/Expense");

const router = express.Router();

const getStudentExpenseRouter = router.get(
  "/api/expenses/student",
  async (req, res) => {
    console.log(req.query.assessmentId);
    try {
      Expense.find(
        {
          assessmentId: req.query.assessmentId,
        },
        (err, doc) => {
          if (err) {
            res.send(err);
          } else {
            res.send(doc);
          }
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(200).json({
        message: "Server Error",
      });
    }
  }
);

module.exports = getStudentExpenseRouter;
