const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const addQualificationRouter = router.post(
  "/api/enquiry/qualification/add",
  async (req, res) => {
    const { ref_no } = req.query;
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
        { ref_no: ref_no },
        {
          $addToSet: {
            qualifications: {
              passingMonth,
              passingYear,
              startingMonth,
              startingYear,
              grade,
              uniOrBoard,
              courseStudied,
              qualification,
            },
          },
        },
        { new: true },
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

module.exports = addQualificationRouter;
