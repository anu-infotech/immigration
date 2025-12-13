const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const addAppliedCourseRouter = router.post(
  "/api/enquiry/course/add",
  async (req, res) => {
    const { ref_no } = req.query;
    const { university, country, type, course, intake } = req.body;
    try {
      await Enquiry.findOneAndUpdate(
        { ref_no: ref_no },
        {
          $addToSet: {
            coursesApplied: {
              university,
              country,
              type,
              course,
              intake,
              applied: false,
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

module.exports = addAppliedCourseRouter;
