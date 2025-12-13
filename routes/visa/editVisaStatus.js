const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const editVisaStatus = router.post(
  "/api/enquiry/visa/edit",
  async (req, res) => {
    const { ref_no, visaId } = req.query;
    const { status } = req.body;
    try {
      await Enquiry.findOneAndUpdate(
        { ref_no, "visas._id": visaId },
        {
          $set: {
            "visas.$.status": status,
          },
        },
        (err, doc) => {
          if (err) return res.status(400).send("Somethingwent wrong.");
          return res.send(doc);
        }
      );
    } catch (error) {
      res.send("something went wrong");
    }
  }
);

module.exports = editVisaStatus;
