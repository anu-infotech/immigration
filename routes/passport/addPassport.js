const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const addPassportRouter = router.post(
  "/api/enquiry/passport/add",
  async (req, res) => {
    const { ref_no } = req.query;
    const { number, validFrom, validTo, address, issuePlace } = req.body;
    try {
      await Enquiry.findOneAndUpdate(
        { ref_no: ref_no },
        {
          $addToSet: {
            passport: {
              number,
              validFrom,
              validTo,
              address,
              issuePlace,
            },
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

module.exports = addPassportRouter;
