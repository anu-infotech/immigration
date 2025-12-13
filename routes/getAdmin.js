const express = require('express')
const Admin = require('../model/Admin')
const router = express.Router()

const getAdminRouter = router.get('/api/getAdmin', async (req, res) => {
  const { email } = req.query
  try {
    const admins = await Admin.findOne({ email: email })
    res.send(admins)
  } catch (error) {
    res.send('something went wrong')
  }
})

module.exports = getAdminRouter
