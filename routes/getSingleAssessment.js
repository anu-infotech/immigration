const express = require("express");
const Enquiry = require("../model/Enquiry");
const router = express.Router();

const getSingleAssessment = router.get(
  "/api/assessments/singleAssessment",
  async (req, res) => {
    const { ref_no } = req.query;
    try {
      const assessment = await Enquiry.findOne({ ref_no }, function (err, doc) {
        if (err) return res.send(400).send("something went wrong");
        return res.send(doc);
      });
    } catch (error) {
      return res.send("something went wrong");
    }
  }
);

module.exports = getSingleAssessment;
