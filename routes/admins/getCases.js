const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const getCasesRouter = router.get("/api/cases", async (req, res) => {
  const { email } = req.query;
  try {
    await Enquiry.find(
      { accepted: true, "case_handled_by.email": email },
      function (err, docs) {
        if (err) return res.send(400).send("something went wrong");
        return res.send(docs);
      }
    );
  } catch (error) {
    return res.send("something went wrong");
  }
});

module.exports = getCasesRouter;
