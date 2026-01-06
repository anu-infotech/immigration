const express = require("express");
const Enquiry = require("../../model/Enquiry");
const Receipt = require("../../model/Reciepts");
const router = express.Router();

router.get("/api/receipts", async (req, res) => {
  const { branch, type } = req.query;

  try {
    let receipts = [];

    // ADMIN → get all receipts
    if (type === "admin") {
      receipts = await Receipt.find();
    }

    // MANAGER → filter by branch via Enquiry
    if (type === "manager") {
      // 1️⃣ get enquiry IDs for branch
      const enquiries = await Enquiry.find(
        { "location.value": branch },
        { _id: 1 }
      );

      const enquiryIds = enquiries.map(e => e._id);

      // 2️⃣ get receipts using enquiry_id
      receipts = await Receipt.find({
        assessmentId: { $in: enquiryIds }
      });
    }

    return res.status(200).json(receipts);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;
