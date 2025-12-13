const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const deleteVisaRouter = router.get(
  "/api/enquiry/visa/delete",
  async (req, res) => {
    const { ref_no, visaId } = req.query;
    try {
      await Enquiry.findOneAndUpdate(
        { ref_no },
        {
          $pull: {
            visas: {
              _id: visaId,
            },
          },
        },
        { new: true },
        (err, doc) => {
          console.log(err);
          if (err) return res.status(400).send("Something went wrong.");
          return res.send(doc);
        }
      );
    } catch (error) {
      console.log(error);
      return res.send("something went wrong");
    }
  }
);

module.exports = deleteVisaRouter;
