const express = require("express");
const Admin = require("../../model/Admin");

const router = express.Router();

const updateRoleRouter = router.get("/api/update/role", async (req, res) => {
  try {
    const { email, type } = req.query;
    await Admin.findOneAndUpdate(
      { email },
      {
        type,
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

module.exports = updateRoleRouter;
