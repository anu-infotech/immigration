const express = require("express");
const Enquiry = require("../../model/Enquiry");

const router = express.Router();

const searchByDOBRouter = router.get("/api/search/dob", async (req, res) => {
  const { dob } = req.query;
  try {
    await Enquiry.find({ dob }, function (err, doc) {
      if (err) return res.send(400).send("something went wrong");
      return res.send(doc);
    });
  } catch (error) {
    res.send("something went wrong");
  }
});

module.exports = searchByDOBRouter;
