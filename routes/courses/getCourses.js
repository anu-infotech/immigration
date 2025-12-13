const express = require("express");
const Course = require("../../model/Course");
const router = express.Router();

const getCoursesRouter = router.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.send(courses);
  } catch (error) {
    res.send("something went wrong");
  }
});

module.exports = getCoursesRouter;
