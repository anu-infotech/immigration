const express = require("express");
const University = require("../../model/University");
const router = express.Router();

const createUniversityRouter = router.post(
  "/api/university/create",
  async (req, res) => {
    const { name, tieUp, country } = req.body;

    try {
      await University.create(
        {
          name,
          tieUp,
          country
        },
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

module.exports = createUniversityRouter;
