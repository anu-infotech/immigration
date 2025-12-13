const express = require("express");
const Course = require("../../model/Course");
const router = express.Router();

const editCourseRouter = router.post("/api/course/edit", async (req, res) => {
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
  const { id } = req.query;
  try {
    await Course.findOneAndUpdate(
      { _id: id },
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
      { new: true },
      (err, doc) => {
        if (err) return res.status(400).send("Something Went wrong");
        return res.send(doc);
      }
    );
  } catch (error) {
    return res.status(400).send("Something Went wrong");
  }
});

module.exports = editCourseRouter;
