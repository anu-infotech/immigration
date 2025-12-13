const express = require('express')
const Admin = require('../model/Admin')
const router = express.Router()

const updateAdminPasswordRouter = router.post(
  '/api/admin/update/password',
  async (req, res) => {
    const { password } = req.body
    const { email } = req.query

    try {
      const admin = await Admin.findOneAndUpdate(
        { email },
        { password },
        function (err) {
          if (err) {
            res.status(400).send('Something went wrong')
          }

          res.send('Password updated successfully')
        }
      )
    } catch (error) {
      res.send('something went wrong')
    }
  }
)

module.exports = updateAdminPasswordRouter
