const express = require("express");
const Enquiry = require("../../model/Enquiry");
const router = express.Router();

const searchByNameRouter = router.get("/api/search/name", async (req, res) => {
  const { name } = req.query;
  try {
    const assessment = await Enquiry.find(
      { first_name: { $regex: ".*" + name + ".*", $options: "i" } },
      function (err, docs) {
        if (err) return res.send(400).send("something went wrong");
        return res.send(docs);
      }
    );
  } catch (error) {
    res.send("something went wrong");
  }
});

module.exports = searchByNameRouter;
