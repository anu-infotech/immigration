const express = require("express");
const Enquiry = require("../model/Enquiry");
const { default: Axios } = require("axios");
const router = express.Router();

const sendStatusUpdatesRouter = router.post(
  "/api/assessment/status-updates",
  async (req, res) => {
    const { msg, action_required } = req.body;
    const { ref_no } = req.query;
    const date = new Date();
    console.log(ref_no);
    try {
      const statusUpdate = await Enquiry.findOneAndUpdate(
        { ref_no },
        {
          $addToSet: {
            status_updates: {
              msg,
              date: Date.now(),
              time: date.getTime(),
              action_required: action_required.value,
            },
          },
        },
        function (err, doc) {
          if (err) return res.status(400).send("something went wrong");

          const notification = {
            to: doc.notificationsPushToken,
            channelId: "status-update",
            sound: "default",
            priority: "high",
            shouldShowAlert: true,
            title: "Status update " + doc.first_name,
            vibrate: true,
            body: msg,
          };

          Axios.post(
            "https://exp.host/--/api/v2/push/send",
            JSON.stringify(notification),
            {
              headers: {
                host: "exp.host",
                "Content-Type": "application/json",
                accept: "application/json",
                "accept-encoding": "gzip,deflate",
                "content-type": "application/json",
              },
            }
          );

          return res.send(doc);
        }
      );
    } catch (error) {
      return res.send("something went wrong");
    }
  }
);

module.exports = sendStatusUpdatesRouter;
