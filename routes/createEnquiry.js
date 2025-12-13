const express = require("express");
const Enquiry = require("../model/Enquiry");
const nodemailer = require("nodemailer");
const router = express.Router();

const createEnquiryRoute = router.post(
  "/api/enquiry/create",
  async (req, res) => {
    const {
      any_refusal,
      visa_refused_for,
      first_name,
      surname,
      mobile,
      address,
      email,
      country,
      pincode,
      city,
      qualification,
      passout_year,
      stream,
      percentage,
      country_apply_for,
      english_test_type,
      location,
      ielts_score_listening,
      ielts_score_speaking,
      ielts_score_writing,
      ielts_score_reading,
      pte_score,
      overall,
      spouse,
      spouseName,
      dob,
    } = req.body;
    console.log(req.body);
    try {
      const enquiry = new Enquiry({
        ref_no: Date.now(),
        any_refusal,
        spouse,
        spouseName,
        visa_refused_for,
        first_name,
        surname,
        mobile,
        address,
        email,
        country,
        pincode,
        city,
        qualification,
        passout_year,
        stream,
        percentage,
        country_apply_for,
        english_test_type,
        dob,
        created_by: {
          name: req.query.name,
          email: req.query.email,
        },
        location,
        ielts_score_listening,
        ielts_score_speaking,
        ielts_score_writing,
        ielts_score_reading,
        pte_score,
        overall,
      });

      await enquiry.save(function (err, doc) {
        if (err) {
          console.log(err);
          res.status(400).send(err);
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
          to:
            location.value === "gurdaspur"
              ? "aussiehubgsp@gmail.com"
              : "aussiehubbtl@gmail.com",
          subject: "New Assessment Generated " + enquiry.ref_no,
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
            </h3><h1 style="text-align: center;">Alert! New Assessment</h1><ol><li>Name: ${first_name}</li><li>Surname: ${surname}</li><li>Country applying for: ${country_apply_for.label}</li><li>Test: ${english_test_type.label}</li><li>Study level: ${qualification.label}</li><li>Percentage: ${percentage}</li><li>Any Refusal: ${any_refusal.label}</li></ol></div>`,
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

module.exports = createEnquiryRoute;
