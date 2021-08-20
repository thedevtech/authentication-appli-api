const express = require("express");
const router = express.Router();
const verify = require("./vertifyToken");

//Private
router.get("/", verify, (req, res) => {
  res.json("Success");
});

module.exports = router;
