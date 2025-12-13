const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const addWorkRouter = router.post("/api/enquiry/work/add", async (req, res) => {
  const { ref_no } = req.query;
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
      { ref_no: ref_no },
      {
        $addToSet: {
          workExperience: {
            companyName,
            city,
            designation,
            fromYear,
            fromMonth,
            toYear,
            toMonth,
          },
        },
      },
      { new: true },
      (err, doc) => {
        console.log(err);
        if (err) return res.status(400).send("Somethingwent wrong.");
        return res.send(doc);
      }
    );
  } catch (error) {
    res.send("something went wrong");
  }
});

module.exports = addWorkRouter;
