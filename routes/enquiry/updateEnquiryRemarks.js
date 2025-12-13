const express = require('express');
const Enquiry = require('../../model/Enquiry');
const router = express.Router();

const updateEnquiryRemarksRouter = router.post(
  '/api/enquiry/remarks/update',
  async (req, res) => {
    const { remarks } = req.body;
    console.log("🚀 ~ remarks:", remarks)
    const { ref_no } = req.query;
    try {
      await Enquiry.findOneAndUpdate(
        { ref_no },
        {
          $addToSet: {
            remarks: {
              date: new Date().toISOString(),
              remarks: remarks
            },
          },
        },
        { new: true },
        function (err, doc) {
          console.log(err)
          if (err) return res.status(400).send('something went wrong');
          return res.send(doc);
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(400).send('something went wrong');
    }
  }
);

module.exports = updateEnquiryRemarksRouter;
