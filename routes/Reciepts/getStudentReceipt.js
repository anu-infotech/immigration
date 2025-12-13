const express = require("express");
const Enquiry = require("../../model/Enquiry");
const Reciept = require("../../model/Reciepts");
const router = express.Router();

const getStudentReceiptRouter = router.get(
  "/api/receipts/student",
  async (req, res) => {
    console.log(req.query.assessmentId);
    try {
      Reciept.find(
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

module.exports = getStudentReceiptRouter;
