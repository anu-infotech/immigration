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
          date: Date.now(),
        },
        async (err, doc) => {
          console.log(err, "==================");
          if (err) return res.status(400).send("Something Went wrong");

          const data = await Enquiry.find({ _id: assessmentId });
          console.log(data)
          await Enquiry.findOneAndUpdate(
            { _id: assessmentId },
            {
              total_amount: parseFloat(data[0].total_amount) - parseFloat(amount),
            },
            (err, doc) => {
              console.log(err)
            }
          );

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
