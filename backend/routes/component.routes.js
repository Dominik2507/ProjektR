const express = require("express");
const router = express.Router();
const { ProcessComponent } = require("../models/ProcessComponentModel.js");

router.get("byComponentId", async function (req, res) {
  const component = new ProcessComponent({ componentid: req.body.componentid });

  try {
    const result = await component.getById();
    res.send(result);
  } catch (e) {
    res.status(501);
    res.send("Problems when getting component. Please try again later.");
  }
});

router.get("/byPhaseId", async function (req, res) {
  const component = new ProcessComponent({ phaseid: req.body.phaseid });

  try {
    const result = await component.getProcessComponentsByProcessPhaseId();
    res.send(result);
  } catch (e) {
    res.status(501);
    res.send("Problems when getting components. Please try again later.");
  }
});

router.post("/create", async function (req, res) {
  const component = new ProcessComponent({
    name: req.body.name,
    phaseid: req.body.phaseid,
  });

  try {
    const result = await component.addProcessComponent();
    res.send(result);
  } catch (e) {
    res.status(501);
    res.send("Problems when creating component. Please try again later.");
  }
});

module.exports = router;
