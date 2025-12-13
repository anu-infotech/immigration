const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const deleteAssessmentRouter = router.get(
  "/api/assessment/delete",
  async (req, res) => {
    const { ref_no } = req.query;
    await Enquiry.findOneAndDelete({ ref_no }, (err) => {
      if (err) return res.status(400).send("Something Went wrong");
      return res.send({});
    });
  }
);

module.exports = deleteAssessmentRouter;
