const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const deleteTestRouter = router.get(
  "/api/enquiry/test/delete",
  async (req, res) => {
    const { ref_no, testId } = req.query;
    try {
      await Enquiry.findOneAndUpdate(
        { ref_no },
        {
          $pull: {
            testTaken: {
              _id: testId,
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

module.exports = deleteTestRouter;
