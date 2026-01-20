const express = require("express");
const Enquiry = require("../model/Enquiry");
const Admin = require("../model/Admin");
const router = express.Router();

const getStatsRouter = router.get("/api/getStats", async (req, res) => {
  const { email, admin, type, branch } = req.query;
  // console.log(branch);
  try {
    if (type == "admin") {
      let adminApplication = [];
      let adminOffers = [];
      let adminVisas = [];
      const active = await Enquiry.find({
        accepted: true,
      });
      const rejected = await Enquiry.find({
        accepted: false,
      });
      const unattended = await Enquiry.find({
        accepted: null,
      });

      const applications = active.map((assessment) => {
        return assessment.applications.map((app) => {
          return adminApplication.push(app);
        });
      });

      const offers = active.map((assessment) => {
        return assessment.offerLetters.map((offer) => {
          if (
            offer.status.label === "Conditional" ||
            offer.status.label === "Unconditional"
          ) {
            return adminOffers.push(offer);
          }
        });
      });

      const visas = active.map((assessment) => {
        return assessment.visas.map((visa) => {
          if (visa.status.value == "Visa Recevied") {
            return adminVisas.push(visa);
          }
        });
      });
      return res.send({
        active: active.length,
        rejected: rejected.length,
        unattended: unattended.length,
        applications: adminApplication.length,
        offerLetters: adminOffers.length,
        visas: adminVisas.length,
      });
    } else if (type == 'manager') {
      let adminApplication = [];
      let adminOffers = [];
      let adminVisas = [];

      const active = await Enquiry.find({
        "location.value": branch,
        accepted: true,
      });
      const rejected = await Enquiry.find({
        "location.value": branch,
        accepted: false,
      });
      const unattended = await Enquiry.find({
        "location.value": branch,
        accepted: null,
      });

      const applications = active.map((assessment) => {
        return assessment.applications.map((app) => {
          return adminApplication.push(app);
        });
      });

      const offers = active.map((assessment) => {
        return assessment.offerLetters.map((offer) => {
          if (
            offer.status.label === "Conditional" ||
            offer.status.label === "Unconditional"
          ) {
            return adminOffers.push(offer);
          }
        });
      });


      const visas = active.map((assessment) => {
        return assessment.visas.map((visa) => {
          console.log(visa);
          if (visa.status.value == "Visa Recevied") {
            return adminVisas.push(visa);
          }
        });
      });

      return res.send({
        active: active.length,
        rejected: rejected.length,
        unattended: unattended.length,
        applications: adminApplication.length,
        offerLetters: adminOffers.length,
        visas: adminVisas.length,
      });
    }
    else if (type == 'user') {
      let adminApplication = [];
      let adminOffers = [];
      let adminVisas = [];

      const active = await Enquiry.find({
        "case_handled_by.email": email,
        accepted: true,
      });
      const rejected = await Enquiry.find({
        "location.value": branch,
        accepted: false,
      });
      const unattended = await Enquiry.find({
        "location.value": branch,
        accepted: null,
      });

      const applications = active.map((assessment) => {
        return assessment.applications.map((app) => {
          return adminApplication.push(app);
        });
      });

      const offers = active.map((assessment) => {
        return assessment.offerLetters.map((offer) => {
          if (
            offer.status.label === "Conditional" ||
            offer.status.label === "Unconditional"
          ) {
            return adminOffers.push(offer);
          }
        });
      });

      const visas = active.map((assessment) => {
        return assessment.visas.map((visa) => {
          if (visa.status.value == "Visa Recevied") {
            return adminVisas.push(visa);
          }
        });
      });

      return res.send({
        active: active.length,
        rejected: rejected.length,
        unattended: unattended.length,
        applications: adminApplication.length,
        offerLetters: adminOffers.length,
        visas: adminVisas.length,
      });
    }
  } catch (error) {
    res.send("Something went wrong");
  }
});

module.exports = getStatsRouter;
