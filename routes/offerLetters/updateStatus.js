const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const updateApplicationStatusRouter = router.post(
  "/api/enquiry/application/status/edit",
  async (req, res) => {
    const { ref_no, applicationId } = req.query;
    const { status } = req.body;
    try {
      await Enquiry.findOneAndUpdate(
        { ref_no, "applications._id": applicationId },
        {
          $set: {
            "applications.$.status": status,
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

module.exports = updateApplicationStatusRouter;
