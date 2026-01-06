const express = require("express");
const Enquiry = require("../../model/Enquiry");
const Expense = require("../../model/Expense");

const router = express.Router();

router.get("/api/expenses", async (req, res) => {
  const { branch, type } = req.query;

  try {
    let expenses = [];

    // Admin → get all expenses
    if (type === "admin") {
      expenses = await Expense.find();
    }

    // Manager → filter by branch via Enquiry
    if (type === "manager") {
      // 1️⃣ get enquiry IDs for branch
      const enquiries = await Enquiry.find(
        { "location.value": branch },
        { _id: 1 }
      );

      const enquiryIds = enquiries.map(e => e._id);

      // 2️⃣ get expenses using enquiry_id
      expenses = await Expense.find({
        assessmentId: { $in: enquiryIds }
      });
    }

    return res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;
