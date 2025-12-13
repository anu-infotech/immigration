const express = require("express");
const Course = require("../../model/Course");
const router = express.Router();

const createCourseRouter = router.post(
  "/api/course/create",
  async (req, res) => {
    const {
      university,
      program,
      duration,
      courseContentLink,
      applicationFee,
      ielts,
      pte,
      toefl,
      gre,
      gmat,
      sat,
      tuitionFee,
      applicationLink,
      campus,
      graduateType,
      entryRequirement,
      intake,
    } = req.body;

    try {
      await Course.create(
        {
          university,
          program,
          duration,
          courseContentLink,
          applicationFee,
          ielts,
          pte,
          toefl,
          gre,
          gmat,
          sat,
          tuitionFee,
          applicationLink,
          campus,
          graduateType,
          entryRequirement,
          intake,
        },
        (err, doc) => {
          console.log(err);
          if (err) return res.status(400).send("Something Went wrong");
          return res.send(doc);
        }
      );
    } catch (error) {
      return res.status(400).send("Something Went wrong");
    }
  }
);

module.exports = createCourseRouter;
