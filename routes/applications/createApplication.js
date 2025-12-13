const express = require("express");
const Admin = require("../../model/Admin");
const Course = require("../../model/Course");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const createApplicationRouter = router.post(
  "/api/enquiry/application/create",
  async (req, res) => {
    const {
      applicationType,
      documents,
      course,
      university,
      country,
      status,
      intake,
      assessmentId,
      name,
      caseHandler,
    } = req.body;

    const { ref_no, courseAppliedId } = req.query;
    try {
      await Enquiry.findOneAndUpdate(
        { ref_no },
        {
          $addToSet: {
            applications: {
              apn: "APN-" + Date.now(),
              date: Date.now(),
              applicationType,
              country,
              university,
              course,
              documents,
              intake,
              status,
              assessmentId,
              name,
              caseHandler,
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
                  name: "application",
                  date: Date.now(),
                },
              },
            }
          );
          //Update course applied field
          await Enquiry.findOneAndUpdate(
            { ref_no, "coursesApplied._id": courseAppliedId },
            {
              $set: {
                "coursesApplied.$.applied": true,
              },
            },
            (err, doc) => {
              if (err) return res.status(400).send("Somethingwent wrong.");
              return res.send(doc);
            }
          );
        }
      );
    } catch (error) {
      return res.status(400).send("Something Went wrong");
    }
  }
);

module.exports = createApplicationRouter;
