const express = require("express");
const router = express.Router();
const { Parameter } = require("../models/ParameterModel");

router.get("/get/:parameterid", (req, res) => {
  (async () => {
    let parameterid = req.params.parameterid;
    let parameter = new Parameter({ parameterid: parameterid });

    try {
      let result = await parameter.getParameter();
      res.status(200);
      res.send(result);
    } catch {
      res.status(500);
      res.send("Could not get parameter");
      return;
    }
  })();
});

router.get("/getByProcessId/:processid", (req, res) => {
  (async () => {
    let processid = req.params.processid;
    let parameter = new Parameter({ processid: processid });

    try {
      let result = await parameter.getParametersByProcessId();
      res.status(200);
      res.send(result);
    } catch {
      res.status(500);
      res.send("Could not get parameters");
      return;
    }
  })();
});

router.get("/getByPhaseId/:phaseid", (req, res) => {
  (async () => {
    let phaseid = req.params.phaseid;
    let parameter = new Parameter({ phaseid: phaseid });

    try {
      let result = await parameter.getParametersByPhaseId();
      res.status(200);
      res.send(result);
    } catch {
      res.status(500);
      res.send("Could not get parameters");
      return;
    }
  })();
});

router.get("/getByComponentId/:componentid", (req, res) => {
  async () => {
    let componentid = req.params.componentid;
    let parameter = new Parameter({ componentid: componentid });

    try {
      let result = await parameter.getParametersByComponentId();
      res.status(200);
      res.send(result);
    } catch {
      res.status(500);
      res.send("Could not get parameters");
      return;
    }
  };
});

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
