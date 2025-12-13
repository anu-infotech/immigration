const express = require("express");
const Enquiry = require("../model/Enquiry");
const router = express.Router();

const getSingleAssessmentApp = router.get(
  "/api/app/assessments/singleAssessment",
  async (req, res) => {
    const { mobile } = req.query;
    const assessment = await Enquiry.findOne({ mobile: parseInt(mobile) });
    if (!assessment) {
      return res.status(400).send("Something Wentrong");
    }

    if (assessment) {
      res.send(assessment);
    }
  }
);

module.exports = getSingleAssessmentApp;
