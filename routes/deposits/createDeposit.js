const express = require("express");
const uploadImage = require("../../helpers/helpers");
const Admin = require("../../model/Admin");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const createDepositRouter = router.post(
  "/api/enquiry/deposit/create",
  async (req, res) => {
    const { ref_no } = req.query;
    const {
      amount,
      number,
      depositType,
      dateOfIssue,
      bank,
      remarks,
      courierName,
      docketNumber,
      dateOfDispatch,
      ddDescription,
      offerLetter,
      caseHandler,
      assessment,
    } = JSON.parse(req.body.formValues);
    const file = req.file;
    try {
      let imageUrl;
      if (file) {
        imageUrl = await uploadImage(file);
      }
      await Enquiry.findOneAndUpdate(
        { ref_no: ref_no },
        {
          $addToSet: {
            deposits: {
              id: Date.now(),
              amount,
              number,
              depositType,
              dateOfIssue,
              bank,
              remarks,
              courierName,
              docketNumber,
              dateOfDispatch,
              ddDescription,
              documentURI: imageUrl ? imageUrl : null,
              assessment,
              offerLetter,
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
                  name: "deposit",
                  date: Date.now(),
                  type: amount,
                },
              },
            }
          );
          return res.send(doc);
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(400).send("Something Went wrong");
    }
  }
);

module.exports = createDepositRouter;
