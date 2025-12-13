const express = require("express");
const Enquiry = require("../../model/Enquiry");

const router = express.Router();

const getResultsByOfficialEmail = router.get(
  "/api/search/email/official",
  async (req, res) => {
    const { email } = req.query;
    try {
      const assessment = await Enquiry.find(
        { officialEmail: email },
        function (err, doc) {
          if (err) return res.send(400).send("something went wrong");
          return res.send(doc);
        }
      );
    } catch (error) {
      res.send("something went wrong");
    }
  }
);

module.exports = getResultsByOfficialEmail;
