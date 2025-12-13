const express = require("express");
const Enquiry = require("../../model/Enquiry");
const Reciept = require("../../model/Reciepts");
const router = express.Router();

const createRecieptRouter = router.post(
  "/api/reciept/add",
  async (req, res) => {
    const {
      particulars,
      name,
      address,
      mobile,
      recieptNumber,
      assessmentId,
      amount,
     
    } = req.body;
    try {
      await Reciept.create(
        {
          particulars,
          name,
          address,
          mobile,
          recieptNumber,
          assessmentId,
          amount,
          date: Date.now()
        },
        (err, doc) => {
          console.log(err)
          if (err) return res.status(400).send("Something Went wrong");
          return res.send(doc);
        }
      );
    } catch (error) {
      console.log(error);
      res.send("something went wrong");
    }
  }
);

module.exports = createRecieptRouter;
