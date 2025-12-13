const express = require("express");
const Branch = require("../../model/Branch");
const router = express.Router();

const editBranchRouter = router.post("/api/branches/edit", async (req, res) => {
  const {
    name,
    slug
  } = req.body;
  const { id } = req.query;
  try {
    await Branch.findOneAndUpdate(
      { _id: id },
      {
        name,
        slug
      },
      { new: true },
      (err, doc) => {
        if (err) return res.status(400).send("Something Went wrong");
        return res.send(doc);
      }
    );
  } catch (error) {
    return res.status(400).send("Something Went wrong");
  }
});

module.exports = editBranchRouter;
