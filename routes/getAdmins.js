const express = require('express')
const Admin = require('../model/Admin')
const router = express.Router()

const getAdminsRouter = router.get('/api/admins/list', async (req, res) => {
  try {
    const admins = await Admin.find({})
    res.send(admins)
  } catch (error) {
    res.send('something went wrong')
  }
})

module.exports = getAdminsRouter
