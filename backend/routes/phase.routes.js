const express = require("express");
const router = express.Router();
const { ProcessPhase } = require("../models/ProcessPhaseModel.js");

router.post("/create", async function (req, res) {
  const phase = new ProcessPhase({
    name: req.body.name,
    location: req.body.location,
    description: req.body.description,
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

router.get("/byProcessId/:processid", async function (req, res) {
  const phase = new ProcessPhase({
    processid: req.params.processid,
  });

  try {
    const result = await phase.GetProcessPhases();
    res.send(result);
  } catch (e) {
    res.status(501);
    res.send("Problems when getting phases. Please try again later.");
  }
});

module.exports = router;
