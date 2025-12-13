const express = require("express");
const Admin = require("../../model/Admin");
const Password = require("../../helpers/password");
const router = express.Router();
const changePasswordRouter = router.post("/api/update/password", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await Password.toHash(password.trim());
    await Admin.findOneAndUpdate(
      { email },
      {
        password: hashedPassword
      }
    ).exec(function (err, doc) {
      if (err) {
        res.status(400).send("Unable to update");
      }
    });

    const users = await Admin.find({});
    res.send(users);
  } catch (error) {
    res.send("Something went wrong");
  }

  

});






module.exports = changePasswordRouter;
