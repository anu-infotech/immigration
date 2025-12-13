const express = require("express");
const Enquiry = require("../model/Enquiry");
const router = express.Router();

const getAcceptedAssessments = router.get(
  "/api/assessments/acceptedAssessments",
  async (req, res) => {
    const { location, admin } = req.query;
    try {
      if (admin == "true") {
        const newAssessments = await Enquiry.find(
          { accepted: true },
          function (err, docs) {
            if (err) res.send(400).send("something went wrong");
            return res.send(docs);
          }
        );
      } else if (admin == "false") {
        const newAssessments = await Enquiry.find(
          { accepted: true },
          function (err, docs) {
            if (err) res.send(400).send("something went wrong");
            return res.send(docs);
          }
        );
      }
    } catch (error) {
      res.send("something went wrong");
    }
  }
);

module.exports = getAcceptedAssessments;
