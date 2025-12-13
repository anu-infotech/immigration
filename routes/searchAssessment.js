const express = require('express')
const Enquiry = require('../model/Enquiry')
const router = express.Router()

const searchAssessmentRouter = router.get(
  '/api/assessment/search',
  async (req, res) => {
    const { mobile, name } = req.params

    try {
      if (mobile && !name) {
        const assessments = await Enquiry.find({ mobile }, function (
          err,
          docs
        ) {
          if (err) {
            res.status(400).send('something went wrong')
          }

          res.send(docs)
        })
      }

      if (name && !mobile) {
        const assessments = await Enquiry.find({ first_name: name }, function (
          err,
          docs
        ) {
          if (err) {
            res.status(400).send('something went wrong')
          }

          res.send(docs)
        })
      }
    } catch (error) {
      res.send('something went wrong')
    }
  }
)

module.exports = searchAssessmentRouter
