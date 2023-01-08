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

router.get("/user/:userid", (req, res) => {
  (async () => {
    let userId = parseInt(req.params.userid);
    console.log(userId);
    if (Number.isNaN(userId)) {
      res.status(400);
      res.send("Please check your request, id should be number");
      return;
    }

    let result = await Process.getUserProcess(userId);

    if (!result) {
      res.status(501);
      res.send("Server error. Try again later");
      return;
    }

    res.send(result);
  })();
});

router.get("/:id", (req, res, next) => {
  (async () => {
    let id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400);
      res.send("Please check your request, id should be number");
      return;
    }
    let result = await Process.getProcess(id);
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
    let process = new Process(
      req.body.name,
      req.body.start_datetime,
      req.body.end_datetime,
      req.body.description,
      req.body.userid
    );

    let result = await user.insertNewUser();

    if (!result) {
      res.status(501);
      res.send("Problems with sign in.Please try again later.");
      return;
    }
    res.send("ok");
  })();
});

module.exports = router;
