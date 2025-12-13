const express = require("express");
const Admin = require("../../model/Admin");
const Enquiry = require("../../model/Enquiry");
const FollowUp = require("../../model/FollowUp");
const router = express.Router();

const createFollowUpRouter = router.post(
  "/api/enquiry/followUp/add",
  async (req, res) => {
    const { ref_no } = req.query;
    const {
      spoken,
      remarks,
      nextFollowUpDate,
      studentStatus,
      action,
      name,
      assessmentId,
      caseHandler,
      mobile,
      nextAction,
    } = req.body;

    try {
      await Enquiry.findOneAndUpdate(
        { ref_no: ref_no },
        {
          $addToSet: {
            followUps: {
              spoken,
              remarks,
              nextFollowUpDate: nextFollowUpDate ? nextFollowUpDate : null,
              studentStatus,
              action,
              followUpDate: Date.now(),
              name,
              assessmentId,
              caseHandler,
              mobile,
            },
          },
        },
        { new: true },
        async (err, doc) => {
          if (err) return res.status(400).send("Something Went wrong");
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
                if (err) return res.status(400).send("Something Went wrong");
                return res.send(doc);
              }
            );
          } else {
            return res.send(doc);
          }
        }
      );
    } catch (error) {
      return res.status(400).send("Something Went wrong");
    }
  }
);

module.exports = createFollowUpRouter;
