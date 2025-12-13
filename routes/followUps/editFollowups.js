const express = require("express");
const Admin = require("../../model/Admin");
const Enquiry = require("../../model/Enquiry");
const FollowUp = require("../../model/FollowUp");

const router = express.Router();

const editFollowUpRouter = router.post(
  "/api/enquiry/followUp/edit",
  async (req, res) => {
    const { ref_no, followUpId } = req.query;
    const {
      spoken,
      remarks,
      nextFollowUpDate,
      studentStatus,
      action,
      nextAction,
      name,
      assessmentId,
      caseHandler,
      mobile,
    } = req.body;
    try {
      await Enquiry.findOneAndUpdate(
        { ref_no, "followUps._id": followUpId },
        {
          $set: {
            "followUps.$.remarks": remarks,
            "followUps.$.nextFollowUpDate": nextFollowUpDate,
            "followUps.$.studentStatus": studentStatus,
            "followUps.$.action": action,
            "followUps.$.spoken": spoken,
          },
        },
        { new: true },
        async (err, doc) => {
          if (err) return res.status(400).send(err);
          console.log(caseHandler);
          await Admin.findOneAndUpdate(
            { email: caseHandler },
            {
              $addToSet: {
                dailyReportNormal: {
                  name: spoken.label,
                  date: Date.now(),
                  type: action.label,
                },
              },
            }
          );
          if (nextFollowUpDate) {
            await Enquiry.findOneAndUpdate(
              { ref_no: ref_no },
              {
                $addToSet: {
                  followUps: {
                    spoken: null,
                    remarks: null,
                    nextFollowUpDate: null,
                    studentStatus: null,
                    action: nextAction,
                    followUpDate: nextFollowUpDate,
                    name,
                    assessmentId,
                    caseHandler,
                    mobile,
                  },
                },
              },
              { new: true },
              (err, doc) => {
                if (err) return res.status(400).send(err);
                return res.send(doc);
              }
            );
          } else {
            return res.send(doc);
          }
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(400).send("Something Went wrong");
    }
  }
);

module.exports = editFollowUpRouter;
