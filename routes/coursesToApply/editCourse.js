const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const editAppliedCourseRouter = router.post(
  "/api/enquiry/course/edit",
  async (req, res) => {
    const { ref_no, courseAppliedId } = req.query;
    const { university, country, type, course, intake } = req.body;
    try {
      await Enquiry.findOneAndUpdate(
        { ref_no, "courseApplied._id": courseAppliedId },
        {
          $set: {
            "courseApplied.$.university": university,
            "courseApplied.$.country": country,
            "courseApplied.$.type": type,
            "courseApplied.$.course": course,
            "courseApplied.$.intake": intake,
          },
        },
        (err, doc) => {
          if (err) return res.status(400).send("Something went wrong.");
          return res.send(doc);
        }
      );
    } catch (error) {
      res.send("something went wrong");
    }
  }
);

module.exports = editAppliedCourseRouter;
