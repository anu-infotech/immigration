const express = require("express");
const uploadImage = require("../../helpers/helpers");
const Admin = require("../../model/Admin");
const Enquiry = require("../../model/Enquiry");

const router = express.Router();

const uploadPhotoRouter = router.post("/api/photo/upload", async (req, res) => {
  try {
    const { ref_no } = req.query;
    const file = req.file;
    const imageUrl = await uploadImage(file);
    try {
      await Enquiry.findOneAndUpdate(
        { ref_no: ref_no },
        {
          photo: imageUrl,
        },
        { new: true },
        async (err, doc) => {
          if (err) return res.status(400).send("Something Went wrong");
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





module.exports = uploadPhotoRouter;
