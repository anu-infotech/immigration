const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const deletePassportRouter = router.get(
  "/api/enquiry/passport/delete",
  async (req, res) => {
    const { ref_no, passportId } = req.query;
    try {
      await Enquiry.findOneAndUpdate(
        { ref_no },
        {
          $pull: {
            _id: passportId,
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

module.exports = deletePassportRouter;
