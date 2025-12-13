const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const checkForDuplicateEntryEmail = router.get(
  "/api/enquiry/unique/email",
  async (req, res) => {
    const { email } = req.query;
    try {
      await Enquiry.findOne({ email }, function (err, doc) {
        if (err) return res.status(400).send("something went wrong");
        if (doc) {
          return res.status(400).send("Not Unique");
        } else {
          return res.status(200).send("Unique");
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send("something went wrong");
    }
  }
);

module.exports = checkForDuplicateEntryEmail;
