const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const updateApplicationDocuments = router.post(
  "/api/enquiry/application/docs/edit",
  async (req, res) => {
    const { ref_no, applicationId } = req.query;
    const { documents } = req.body;
    try {
      await Enquiry.findOneAndUpdate(
        { ref_no, "applications._id": applicationId },
        {
          $set: {
            "applications.$.documents": documents,
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

module.exports = updateApplicationDocuments;
