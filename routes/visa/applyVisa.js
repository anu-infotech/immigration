const express = require("express");
const Admin = require("../../model/Admin");
const Course = require("../../model/Course");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const createVisaRouter = router.post(
  "/api/enquiry/visa/create",
  async (req, res) => {
    const {
      status,
      remarks,
      applicationId,
      assessmentId,
      caseHandler,
    } = req.body;

    const { ref_no } = req.query;
    console.log(ref_no);
    try {
      await Enquiry.findOneAndUpdate(
        { ref_no },
        {
          $addToSet: {
            visas: {
              status,
              remarks,
              applicationId,
              assessmentId,
              caseHandler,
              date: Date.now(),
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
                  name: "visa",
                  date: Date.now(),
                },
              },
            }
          );

          res.send(doc);
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(400).send("Something Went wrong");
    }
  }
);

module.exports = createVisaRouter;
