const express = require("express");
const Admin = require("../../model/Admin");

const router = express.Router();

const softDeleteAdminRouter = router.get("/api/admins/softdelete", async (req, res) => {
  try {
    const { email } = req.query;
    await Admin.updateOne(
      { email: email },
      {
        deleted_at: new Date()
      }
    ).exec(function (err, doc) {
      if (err) {
        res.status(400).send("Unable to Delete");
      }
    });

    const users = await Admin.find({ deleted_at: null });
    res.send(users);
  } catch (error) {
    res.send("Something went wrong");
  }
});

module.exports = softDeleteAdminRouter;
