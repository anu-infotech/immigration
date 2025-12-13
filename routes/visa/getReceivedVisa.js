const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

router.get("/api/enquiry/visa/get", async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ "visas.status.value": "Visa Recevied" });
    res.status(200).json(enquiries);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;