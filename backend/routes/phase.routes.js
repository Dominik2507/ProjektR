const express = require("express");
const router = express.Router();
const { ProcessPhase } = require("../models/ProcessPhaseModel.js");

router.post("/create", async function (req, res) {
  const phase = new ProcessPhase({
    name: req.body.name,
    start_datetime: req.body.start_datetime,
    end_datetime: req.body.end_datetime,
    description: req.body.description,
    active: req.body.active,
    processid: req.body.processid,
  });

  try {
    const result = await phase.CreateProcessPhase();
    res.send(result);
  } catch (e) {
    res.status(501);
    res.send("Problems when creating phase. Please try again later.");
  }
});

module.exports = router;
