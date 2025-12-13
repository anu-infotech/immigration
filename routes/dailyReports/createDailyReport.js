const express = require("express");
const uploadImage = require("../../helpers/helpers");
const Admin = require("../../model/Admin");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const createReportRouter = router.post(
  "/api/report/create",
  async (req, res) => {
    const { email } = req.query;
    const { task, addInfo } = JSON.parse(req.body.formValues);
    const file = req.file;

    try {
      let imageUrl;
      if (file) {
        imageUrl = await uploadImage(file);
      }
      await Admin.findOneAndUpdate(
        { email },
        {
          $addToSet: {
            dailyReportExtended: {
              date: Date.now(),
              task,
              addInfo,
              document: imageUrl ? imageUrl : null,
            },
          },
        },
        { new: true },
        async (err, doc) => {
          if (err) return res.status(400).send("Something Went wrong");
          return res.send(doc);
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(400).send("Something Went wrong");
    }
  }
);

module.exports = createReportRouter;
