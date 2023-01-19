const express = require("express");
const router = express.Router();
const { Process } = require("../models/ProcessModel");
const db = require("../db/index");

router.get("/all", (req, res, next) => {
  (async () => {
    let result = await Process.getAllProcesses();

    if (!result) {
      res.status(501);
      res.send("Problems with sign in.Please try again later.");
      return;
    }
    res.send(result);
  })();
});

router.get("/byUser/:userid", (req, res) => {
  (async () => {
    if (Number.isNaN(parseInt(req.params.userid))) {
      res.status(400);
      res.send("Please check your request, id should be number");
      return;
    }

    let result = await Process.getProcessOfUser(req.params.userid);

    if (!result) {
      res.status(501);
      res.send("Server error. Try again later");
      return;
    }

    res.send(result);
  })();
});

router.get("/byId/:processid", (req, res, next) => {
  (async () => {
    if (Number.isNaN(req.params.processid)) {
      res.status(400);
      res.send("Please check your request, id should be number");
      return;
    }
    let result = await Process.getProcess(req.params.processid);
    let count = result.length;
    if (count === 0) {
      res.status(404);
      res.send("No process with given id");
      return;
    }
    if (!result) {
      res.status(501);
      res.send("Problems with sign in.Please try again later.");
      return;
    }
    res.send(result[0]);
  })();
});

router.post("/create", (req, res, next) => {
  (async () => {
    let process = new Process(
      null,
      req.body.name,
      req.body.start_datetime,
      req.body.end_datetime,
      req.body.description,
      req.body.userId
    );

    const result = await process.addProcess(req.body.phases);

    if (!result) {
      res.status(501);
      res.send("Problems with sign in.Please try again later.");
      return;
    }
    res.send("ok");
  })();
});

module.exports = router;
