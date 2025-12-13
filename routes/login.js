const express = require('express')
const Admin = require('../model/Admin')
const Password = require('../helpers/password')
const router = express.Router()

const loginRouter = router.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const admin = await Admin.findOne({ email })

    if (!admin) {
      return res.status(400).send('User not registered')
    }

    const adminVerification = await Password.compare(admin.password, password)

    if (!adminVerification) {
      return res.status(400).send('Incorrect email id or password')
    }

    if (admin.status === false) {
      return res.status(400).send('User not active. Please contact admin')
    }

    return res.send({
      admin: {
        mobile: admin.mobile,
        name: admin.name,
        email: admin.email,
        id: admin._id,
        type: admin.type,
      },
      profile_completed: !admin.mobile || !admin.name ? false : true,
      userAuthenticated: true,
    })
  } catch (error) {
    return res.send('Something went wrong')
  }
})

module.exports = loginRouter
