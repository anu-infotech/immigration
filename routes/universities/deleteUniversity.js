const express = require("express");
const University = require("../../model/University");
const router = express.Router();

const deleteUniversityRouter = router.get(
  "/api/university/delete",
  async (req, res) => {
    const { id } = req.query;
    try {
      await University.findOneAndDelete({ _id: id }, (err) => {
        if (err) return res.status(400).send("Something Went wrong");
        return res.send({});
      });
    } catch (error) {
      return res.status(400).send("Something Went wrong");
    }
  }
);

module.exports = deleteUniversityRouter;
