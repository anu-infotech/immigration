const express = require('express')
const Admin = require('../model/Admin')

const router = express.Router()

const registerRouter = router.post('/api/admin/register', async (req, res) => {
  const { email, password, name, mobile } = req.body

  const checkEntry = await Admin.findOne({ email })

  if (checkEntry) return res.status(400).send('Email address already in use')

  const admin = new Admin({
    email: email.toLowerCase().trim(),
    password: password.trim(),
    name: name.trim(),
    mobile: mobile.trim(),
  })

  await admin.save(function (err) {
    if (err) {
      return res.status(400).send('Something went wrong. Please try again')
    } else {
      return res.send(
        'Account created successfully. Please ask the admin to activate the account in order to login.'
      )
    }
  })
})

module.exports = registerRouter
