const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const checkForDuplicateEntryMobile = router.get(
  "/api/enquiry/unique/mobile",
  async (req, res) => {
    const { mobile } = req.query;
    try {
      await Enquiry.findOne({ mobile }, function (err, doc) {
        if (err) return res.status(400).send("something went wrong");
        if (doc) {
          return res.status(400).send("Not Unique");
        } else {
          return res.send(doc);
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send("something went wrong");
    }
  }
);

module.exports = checkForDuplicateEntryMobile;
