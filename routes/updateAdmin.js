const express = require('express')
const Admin = require('../model/Admin')
const router = express.Router()

const updateAdminRouter = router.post('/api/admin/update', async (req, res) => {
  const { name, mobile, email } = req.body

  try {
    const admin = await Admin.findOneAndUpdate(
      { email },
      { name, mobile, email },
      function (err, doc) {
        if (err) res.status(400).send('something went wrong')
        res.send(doc)
      }
    )
  } catch (error) {
    res.send('something went wrong')
  }
})

module.exports = updateAdminRouter
