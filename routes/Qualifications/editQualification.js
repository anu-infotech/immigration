const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const editQualificationRouter = router.post(
  "/api/enquiry/qualification/edit",
  async (req, res) => {
    const { ref_no, qualificationId } = req.query;
    const {
      passingMonth,
      passingYear,
      startingMonth,
      startingYear,
      uniOrBoard,
      grade,
      courseStudied,
      qualification,
    } = req.body;
    try {
      await Enquiry.findOneAndUpdate(
        { ref_no, "qualifications._id": qualificationId },
        {
          $set: {
            "qualifications.$.passingMonth": passingMonth,
            "qualifications.$.passingYear": passingYear,
            "qualifications.$.startingMonth": startingMonth,
            "qualifications.$.startingYear": startingYear,
            "qualifications.$.uniOrBoard": uniOrBoard,
            "qualifications.$.grade": grade,
            "qualifications.$.courseStudied": courseStudied,
            "qualifications.$.qualification": qualification,
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

module.exports = editQualificationRouter;
