const express = require("express");
const router = express.Router();
const { Process } = require("../models/ProcessModel");

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

router.get("/byUser", (req, res) => {
  (async () => {
    if (Number.isNaN(req.body.userid)) {
      res.status(400);
      res.send("Please check your request, id should be number");
      return;
    }

    let result = await Process.getProcessOfUser(req.body.userid);

    if (!result) {
      res.status(501);
      res.send("Server error. Try again later");
      return;
    }

    res.send(result);
  })();
});

router.get("/byId", (req, res, next) => {
  (async () => {
    if (Number.isNaN(req.body.processid)) {
      res.status(400);
      res.send("Please check your request, id should be number");
      return;
    }
    let result = await Process.getProcess(req.body.processid);
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

router.get("/user/:id", (req, res, next) => {
  (async () => {
    let id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400);
      res.send("Please check your request, id should be number");
      return;
    }
    let result = await Process.getProcessOfUser(id);
    let count = result.length;
    if (count === 0) {
      res.status(404);
      res.send("No process with given userid");
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
    let {
      processid,
      name,
      start_datetime,
      end_datetime,
      description,
      userId,
      phases,
    } = req.body;

    let process = new Process(
      null,
      name,
      start_datetime,
      end_datetime,
      description,
      userId
    );

    const result = await process.addProcess(phases);

    if (!result) {
      res.status(501);
      res.send("Problems with sign in.Please try again later.");
      return;
    }
    res.send("ok");
  })();
});

module.exports = router;
