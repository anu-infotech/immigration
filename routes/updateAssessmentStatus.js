const express = require("express");
const Enquiry = require("../model/Enquiry");
const nodemailer = require("nodemailer");

const router = express.Router();

const updateAssessmentStatus = router.get(
  "/api/assessment/updateAssessmentStatus",
  async (req, res) => {
    try {
      const { ref_no, status, name, email } = req.query;
      const updatedAssessment = await Enquiry.findOneAndUpdate(
        { ref_no },
        {
          accepted: status,
          case_handled_by: {
            name,
            email,
          },
        }
      ).exec(function (err, doc) {
        if (err) {
          res.status(400).send("Unable to update");
        }
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "aussiehubgsp@gmail.com",
            pass: "AussieGurdaspur@123",
          },
        });

        let mailDetails = {
          from: "aussiehubgsp@gmail.com",
          to: email,
          subject: "New Assessment Accepted " + ref_no,
          html: `<div><img
            src="https://aussiehub.in/wp-content/uploads/2020/03/Aussie-Hub-Logo-1.jpg"
            alt=""
            style={{
              width: '100%',
              position: 'relative',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '30px',
            }}
          />
            <h3 className="mt-0 mb-2" style={{ fontSize: 40 }}>
              Login
            </h3><h1 style="text-align: center;">Alert! Assessment Accepted</h1><ol><li>`,
        };

        transporter.sendMail(mailDetails, function (err, data) {
          if (err) {
            console.log(err);
          } else {
            console.log("Email sent successfully");
          }
        });
        res.send(doc);
      });
    } catch (error) {
      res.send("Something went wrong");
    }
  }
);

module.exports = updateAssessmentStatus;
