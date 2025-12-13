const express = require('express')
const router = express.Router()

const updateAssessmentRouter = router.post(
  '/api/assessment/update',
  async (req, res) => {
    const {
      appointment_date,
      appointment_time,
      any_refusal,
      first_name,
      surname,
      mobile,
      address,
      email,
      country,
      pincode,
      city,
      qualification,
      percentage,
      country_apply_for,
      english_test_type,
    } = req.body

    const { ref_no } = req.query

    try {
      const enquiry = await Enquiry.findOneAndUpdate(
        { ref_no },
        {
          appointment_date,
          appointment_time,
          any_refusal,
          first_name,
          surname,
          mobile,
          address,
          email,
          country,
          pincode,
          city,
          qualification,
          percentage,
          country_apply_for,
          english_test_type,
        },
        function (err, doc) {
          if (err) {
            res.status(400).send('something went wrong')
          }

          res.send(doc)
        }
      )
    } catch (error) {
      console.log(error)
      res.status(400).send({ msg: 'Something went wrong' })
    }
  }
)

module.exports = updateAssessmentRouter
