const express = require("express");
const University = require("../../model/University");
const router = express.Router();

const editUniversityRouter = router.post(
  "/api/university/edit",
  async (req, res) => {
    const { name, tieUp, country } = req.body;
    const { id } = req.query;
    try {
      await University.findOneAndUpdate(
        { _id: id },
        {
          name,
          tieUp,
          country,
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
  }
);

module.exports = editUniversityRouter;
