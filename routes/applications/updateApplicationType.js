const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const updateApplicationType = router.post(
  "/api/enquiry/application/type/edit",
  async (req, res) => {
    const { ref_no, applicationId } = req.query;
    const { applicationType, remarks } = req.body;
    try {
      await Enquiry.findOneAndUpdate(
        { ref_no, "applications.apn": applicationId },
        {
          $set: {
            "applications.$.applicationType": {
              value: "Defer",
              label: "Defer",
            },
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

module.exports = updateApplicationType;
