const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const editPassportRouter = router.post(
  "/api/enquiry/passport/edit",
  async (req, res) => {
    const { ref_no, passportId } = req.query;
    const { number, validFrom, validTo, address, issuePlace } = req.body;
    try {
      await Enquiry.findOneAndUpdate(
        { ref_no, "passport._id": passportId },
        {
          $set: {
            "passport.$.number": number,
            "passport.$.validFrom": validFrom,
            "passport.$.validTo": validTo,
            "passport.$.address": address,
            "passport.$.issuePlace": issuePlace,
          },
        },
        { new: true },

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

module.exports = editPassportRouter;
