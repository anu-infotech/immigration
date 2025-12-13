const express = require("express");
const Enquiry = require("../model/Enquiry");
const router = express.Router();

const updatePudhTokenRouter = router.get(
  "/api/app/pushToken",
  async (req, res) => {
    const { mobile, notificationsPushToken } = req.query;

    try {
      const statusUpdates = await Enquiry.findOneAndUpdate(
        { mobile },
        { notificationsPushToken },
        function (err, doc) {
          if (err) return res.status(400).send("No record found");
          return res.send(doc);
        }
      );
    } catch (error) {
      res.send("something went wrong");
    }
  }
);

module.exports = updatePudhTokenRouter;
