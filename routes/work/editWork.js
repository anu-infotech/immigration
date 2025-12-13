const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const editWorkRouter = router.post(
  "/api/enquiry/work/edit",
  async (req, res) => {
    const { ref_no, workId } = req.query;
    const {
      companyName,
      city,
      designation,
      fromYear,
      fromMonth,
      toYear,
      toMonth,
    } = req.body;
    try {
      await Enquiry.findOneAndUpdate(
        { ref_no, "workExperience._id": workId },
        {
          $set: {
            "workExperience.$.companyName": companyName,
            "workExperience.$.city": city,
            "workExperience.$.designation": designation,
            "workExperience.$.fromYear": fromYear,
            "workExperience.$.fromMonth": fromMonth,
            "workExperience.$.toYear": toYear,
            "workExperience.$.toMonth": toMonth,
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

module.exports = editWorkRouter;
