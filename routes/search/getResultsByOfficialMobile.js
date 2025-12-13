const express = require("express");
const Enquiry = require("../../model/Enquiry");

const router = express.Router();

const getResultsByOfficialMobile = router.get(
  "/api/search/mobile/official",
  async (req, res) => {
    const { mobile } = req.query;
    try {
      const assessment = await Enquiry.find(
        { officialMobile: mobile },
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

module.exports = getResultsByOfficialMobile;
