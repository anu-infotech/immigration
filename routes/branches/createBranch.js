const express = require("express");
const Branch = require("../../model/Branch");
const router = express.Router();

const createBranchRouter = router.post(
  "/api/branches/create",
  async (req, res) => {
    const {
      name,
      slug
    } = req.body;

    try {
      await Branch.create(
        {
         name,
         slug
        },
        (err, doc) => {
          console.log(err);
          if (err) return res.status(400).send("Something Went wrong");
          return res.send(doc);
        }
      );
    } catch (error) {
      return res.status(400).send("Something Went wrong");
    }
  }
);

module.exports = createBranchRouter;
