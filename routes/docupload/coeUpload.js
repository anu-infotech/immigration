const express = require("express");
const uploadImage = require("../../helpers/helpers");
const Admin = require("../../model/Admin");
const Enquiry = require("../../model/Enquiry");

const router = express.Router();

const uploadCOERouter = router.post("/api/coe/upload", async (req, res) => {
  try {
    const { name, ref_no, caseHandler } = req.query;
    const file = req.file;
    console.log("🚀 ~ uploadCOERouter ~ file:", file)
    const imageUrl = await uploadImage(file);
    console.log("🚀 ~ uploadCOERouter ~ imageUrl:", imageUrl)

    try {
      await Enquiry.findOneAndUpdate(
        { ref_no: ref_no },
        {
          $addToSet: {
            coe: {
              name,
              uri: imageUrl,
              date: Date.now(),
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
                  name: "docUpload",
                  date: Date.now(),
                },
              },
            }
          );
          return res.send(doc);
        }
      );
    } catch (error) {
      return res.status(400).send("Something Went wrong");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = uploadCOERouter;
