const express = require("express");
const Enquiry = require("../../model/Enquiry");
const FollowUp = require("../../model/FollowUp");
const router = express.Router();

const deleteFollowUpRouter = router.get(
  "/api/enquiry/followUp/delete",
  async (req, res) => {
    const { ref_no, followUpId } = req.query;
    try {
      await Enquiry.findOneAndUpdate(
        { ref_no },
        {
          $pull: {
            followUps: {
              _id: followUpId,
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

module.exports = deleteFollowUpRouter;
