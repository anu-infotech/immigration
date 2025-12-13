const express = require("express");
const Enquiry = require("../../model/Enquiry");
const FollowUp = require("../../model/FollowUp");
const router = express.Router();

const deleteDepositRouter = router.get(
  "/api/enquiry/deposit/delete",
  async (req, res) => {
    const { ref_no, depositId } = req.query;
    try {
      await Enquiry.findOneAndUpdate(
        { ref_no },
        {
          $pull: {
            deposits: {
              id: depositId,
            },
          },
        },
        { new: true },
        (err, doc) => {
          if (err) return res.status(400).send("Something Went wrong");
          return res.send(doc);
        }
      );
    } catch (error) {
      return res.status(400).send("Something Went wrong");
    }
  }
);

module.exports = deleteDepositRouter;
