const express = require("express");
const uploadImage = require("../../helpers/helpers");
const Admin = require("../../model/Admin");
const Enquiry = require("../../model/Enquiry");

const router = express.Router();

const updateTotalAmount = router.get(
  "/api/official/amount",
  async (req, res) => {
    try {
      const { total_amount, ref_no } = req.query;
      try {
        await Enquiry.findOneAndUpdate(
          { ref_no: ref_no },
          {
            total_amount,
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
  }
);

module.exports = updateTotalAmount;
