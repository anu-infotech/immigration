const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const updateUniversityApplicationNumnerRouter = router.post(
  "/api/enquiry/application/university-application-number/edit",
  async (req, res) => {
    const { ref_no, applicationId } = req.query;
    const { universityApplicationNumber } = req.body;
    try {
      await Enquiry.findOneAndUpdate(
        { ref_no, "applications._id": applicationId },
        {
          $set: {
            "applications.$.universityApplicationNumber": universityApplicationNumber,
          },
        },
        (err, doc) => {
          if (err) return res.status(400).send("Something went wrong.");
          return res.send(doc);
        }
      );
    } catch (error) {
      res.send("something went wrong");
    }
  }
);

module.exports = updateUniversityApplicationNumnerRouter;
