const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const deleteWorkRouter = router.get(
  "/api/enquiry/work/delete",
  async (req, res) => {
    const { ref_no, workId } = req.query;
    try {
      await Enquiry.findOneAndUpdate(
        { ref_no },
        {
          $pull: {
            workExperience: {
              _id: workId,
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
      console.log(error);
      return res.send("something went wrong");
    }
  }
);

module.exports = deleteWorkRouter;
