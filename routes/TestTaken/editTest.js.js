const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const editTestRouter = router.post(
  "/api/enquiry/test/edit",
  async (req, res) => {
    const { ref_no, testId } = req.query;
    const { testName, testScore, referenceNo, date } = req.body;
    try {
      await Enquiry.findOneAndUpdate(
        { ref_no, "testTaken._id": testId },
        {
          $set: {
            "testTaken.$.testName": testName,
            "testTaken.$.testScore": testScore,
            "testTaken.$.referenceNo": referenceNo,
            "testTaken.$.date": date,
          },
        },
        (err, doc) => {
          if (err) return res.status(400).send("Somethingwent wrong.");
          return res.send(doc);
        }
      );
    } catch (error) {
      res.send("something went wrong");
    }
  }
);

module.exports = editTestRouter;
