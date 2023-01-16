const express = require("express");
const router = express.Router();
const { Parameter } = require("../models/ParameterModel");

router.post("/create", (req, res) => {
  (async () => {
    console.log(req.body);
    let {
      parameterid,
      name,
      unit,
      max_value,
      min_value,
      componentid,
      processid,
      phaseid,
    } = req.body;

    let parameter = new Parameter({
      name: name,
      unit: unit,
      max_value: max_value,
      min_value: min_value,
      componentid: componentid,
      processid: processid,
      phaseid: phaseid,
    });

    try {
      await parameter.addParameter();
      res.status(200);
      res.send("Parameter added");
    } catch {
      res.status(500);
      res.send("Could not add parameter");
      return;
    }
  })();
});

module.exports = router;
