const express = require("express");
const Branch = require("../../model/Branch");
const router = express.Router();

const getBranchesRouter = router.get("/api/branches", async (req, res) => {
  try {
    const branches = await Branch.find({});
    res.send(branches);
  } catch (error) {
    res.send("something went wrong");
  }
});

module.exports = getBranchesRouter;
