const express = require("express");
const Course = require("../../model/Course");
const router = express.Router();

const deleteCourseRouter = router.get(
  "/api/course/delete",
  async (req, res) => {
    const { id } = req.query;
    await Course.findOneAndDelete({ _id: id }, (err) => {
      if (err) return res.status(400).send("Something Went wrong");
      return res.send({});
    });
  }
);

module.exports = deleteCourseRouter;
