const express = require("express");
const Admin = require("../../model/Admin");

const router = express.Router();

const updateAttendanceRouter = router.post(
  "/api/update/attendance",
  async (req, res) => {
    try {
      const { status, location } = req.body;
      const { email } = req.query;
      await Admin.findOneAndUpdate(
        { email },
        {
          $addToSet: {
            attendance: {
              date: Date.now(),
              status,
              location,
            },
          },
        }
      ).exec(function (err) {
        if (err) {
          res.status(400).send("Unable to update");
        }
      });

      const users = await Admin.find({});
      res.send(users);
    } catch (error) {
      res.send("Something went wrong");
    }
  }
);

module.exports = updateAttendanceRouter;
