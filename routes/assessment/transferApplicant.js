const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const transferAssessmentRouter = router.post(
  "/api/assessment/transfer",
  async (req, res) => {
    const { caseHandler } = req.body;
    const { ref_no } = req.query;
    const enq = await Enquiry.findOne({ ref_no: ref_no });

    const newApplications = enq.applications.map((app) => {
      app.caseHandler = caseHandler.value.email;
      return app;
    });

    const newOfferLetters = enq.offerLetters.map((offer) => {
      offer.caseHandler = caseHandler.value.email;
      return offer;
    });

    const newDeposits = enq.deposits.map((deposit) => {
      deposit.caseHandler = caseHandler.value.email;
      return deposit;
    });

    const newFollowUps = enq.followUps.map((follow) => {
      follow.caseHandler = caseHandler.value.email;
      return follow;
    });

    const newVisas = enq.visas.map((visa) => {
      visa.caseHandler = caseHandler.value.email;
      return visa;
    });

    await Enquiry.findOneAndUpdate(
      { ref_no },
      {
        case_handled_by: {
          name: caseHandler.value.name,
          email: caseHandler.value.email,
        },
        applications: newApplications,
        offerLetters: newOfferLetters,
        deposits: newDeposits,
        followUps: newFollowUps,
        visas: newVisas,
      },
      { new: true },
      (err, doc) => {
        console.log(err);
        if (err) return res.status(400).send("Something went wrong");
        return res.send(doc);
      }
    );
  }
);

module.exports = transferAssessmentRouter;
