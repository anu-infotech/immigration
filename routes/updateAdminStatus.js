const express = require('express')
const Admin = require('../model/Admin')

const router = express.Router()

const updateAdminStatus = router.get(
  '/api/assessment/updateAdminStatus',
  async (req, res) => {
    try {
      const { email, status } = req.query
      const updateAdmin = await Admin.findOneAndUpdate(
        { email },
        {
          status: status,
        }
      ).exec(function (err, doc) {
        if (err) {
          res.status(400).send('Unable to update')
        }
      })

      const users = await Admin.find({})
      res.send(users)
    } catch (error) {
      res.send('Something went wrong')
    }
  }
)

module.exports = updateAdminStatus
