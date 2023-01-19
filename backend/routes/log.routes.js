const express = require("express");
const router = express.Router();
const { Log } = require("../models/LogModel");

router.get("/average/:parameterid", async function (req, res, next) {
  try {
    const log = new Log(null, null, null, req.params.parameterid);
    const result = await log.LogAverage();
    res.status(200);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(501);
    res.send("Error");
    return;
  }
});

router.get("/parameter/:parameterid", async function (req, res, next) {
  try {
    const log = new Log(null,null,null,req.params.parameterid);
    const result = await log.getAllParameterLogs();
    res.status(200);
    res.send(result);

  } catch (e) {
    console.log(e);
    res.status(501);
    res.send("Error");
    return;
  }
});

router.get("/:logid", async function (req, res, next) {
  try {
    const log = new Log(req.params.logid);
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
  const log = new Log(null, req.body.value, new Date(), req.body.parameterid);

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
