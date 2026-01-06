const express = require("express");
const Enquiry = require("../model/Enquiry");
const router = express.Router();

const getVisaReceivedAssessments = router.get(
  "/api/assessments/visa_received",
  async (req, res) => {
    const { location, admin } = req.query;
    
    try {
      if (admin == "true") {
        const newAssessments = await Enquiry.find(
          { "visas.status.value": "Visa Recevied" },
          function (err, docs) {
            if (err) res.send(400).send("something went wrong");
            return res.send(docs);
          }
        );
      } else if (admin == "false") {
        
        const newAssessments = await Enquiry.find({ 
          "location.value": location,
          "visas.status.value": "Visa Recevied" 
          },
          function (err, docs) {
            if (err) res.send(400).send("something went wrong");
            return res.send(docs);
          }
        );
      }
    } catch (error) {
      res.send("something went wrong");
    }
  }
);

module.exports = getVisaReceivedAssessments;
