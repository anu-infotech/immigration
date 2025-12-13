const express = require('express')
const Enquiry = require('../model/Enquiry')

const router = express.Router()

const getRejectedAssessmentsRouter = router.get(
  '/api/assessments/rejected',
  async (req, res) => {
    const { location, admin } = req.query
    try {
      if (admin == 'true') {
        const rejectedAssessments = await Enquiry.find({
          accepted: false,
        })
        return res.send(rejectedAssessments)
      } else if (admin == 'false') {
        const rejectedAssessments = await Enquiry.find({
          accepted: false,
          'location.value': location,
        })
        return res.send(rejectedAssessments)
      }
    } catch (error) {
      res.send('Something went wrong')
    }
  }
)

module.exports = getRejectedAssessmentsRouter
