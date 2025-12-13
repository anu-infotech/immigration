const express = require("express");
const Branch = require("../../model/Branch");
const router = express.Router();

const deleteBranchRouter = router.get(
  "/api/branches/delete",
  async (req, res) => {
    const { id } = req.query;
    await Branch.findOneAndDelete({ _id: id }, (err) => {
      if (err) return res.status(400).send("Something Went wrong");
      return res.send({});
    });
  }
);

module.exports = deleteBranchRouter;
