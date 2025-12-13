const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const addTestRouter = router.post("/api/enquiry/test/add", async (req, res) => {
  const { ref_no } = req.query;
  const { testName, testScore, referenceNo, date } = req.body;
  try {
    await Enquiry.findOneAndUpdate(
      { ref_no: ref_no },
      {
        $addToSet: {
          testTaken: {
            testName,
            testScore,
            referenceNo,
            date,
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

module.exports = addTestRouter;
