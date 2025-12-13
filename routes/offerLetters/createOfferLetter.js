const express = require("express");
const uploadImage = require("../../helpers/helpers");
const Course = require("../../model/Course");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const createOfferLetterRouter = router.post(
  "/api/enquiry/offer/create",

  async (req, res) => {
    const {
      applicationType,
      course,
      apn,
      university,
      type,
      country,
      intake,
      assessmentId,
      name,
      caseHandler,
      conditions,
      rejectionReason,
      moreDocuments,
      remarks
    } = JSON.parse(req.body.formValues);

    const file = req.file;

    const { ref_no } = req.query;
    try {
      let imageUrl;
      if (file) {
        imageUrl = await uploadImage(file);
      }
      await Enquiry.findOneAndUpdate(
        { ref_no },
        {
          $addToSet: {
            offerLetters: {
              offerNumber: `OFL-${Date.now()}`,
              apn,
              date: Date.now(),
              applicationType,
              country,
              university,
              course,
              intake,
              status: type,
              assessmentId,
              name,
              caseHandler,
              offerLetterUri: imageUrl ? imageUrl : null,
              conditions,
              rejectionReason,
              moreDocuments,
              remarks,
            },
          },
        },
        { new: true },
        async (err, doc) => {
          if (err) return res.status(400).send("Something Went wrong");

          //Update application applied field

          await Enquiry.findOneAndUpdate(
            { ref_no, "applications.apn": apn },
            {
              $set: {
                "applications.$.offerLetter": true,
                "applications.$.status": {
                  value: "Received Offer Letter",
                  label: "Received Offer Letter",
                },
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
      console.log(error);
      return res.status(400).send("Something Went wrong");
    }
  }
);

module.exports = createOfferLetterRouter;
