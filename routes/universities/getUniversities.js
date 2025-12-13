const express = require("express");
const University = require("../../model/University");
const router = express.Router();

const getUniversitiesRouter = router.get(
  "/api/universities",
  async (req, res) => {
    try {
      const universities = await University.find({});
      res.send(universities);
    } catch (error) {
      res.send("something went wrong");
    }
  }
);

module.exports = getUniversitiesRouter;
