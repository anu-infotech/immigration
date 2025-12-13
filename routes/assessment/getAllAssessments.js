const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const getAllAssessmentsRouter = router.get(
  "/api/assessments/all",
  async (req, res) => {
    try {
      await Enquiry.find({}, function (err, docs) {
        if (err) res.send(400).send("something went wrong");
        return res.send(docs);
      });
    } catch (error) {
      res.send("something went wrong");
    }
  }
);

module.exports = getAllAssessmentsRouter;
