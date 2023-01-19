const express = require("express");
const router = express.Router();
const { Log } = require("../models/LogModel");

router.get("/:logid", async function (req, res, next) {
  const log = new Log({ logid: req.params.logid });

  try {
    const result = await log.getLog();
    res.status(200);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(501);
    res.send("Error");
    return;
  }
});

router.post("/create", async function (req, res, next) {
  const log = new Log({
    value: req.body.value,
    datetime: req.body.datetime,
    parameterid: req.body.parameterid,
  });

  try {
    const result = await log.CreateLog();
    res.status(200);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(501);
    res.send("Error");
    return;
  }
});

module.exports = router;
