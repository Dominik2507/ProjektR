const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");

router.post("/", (req, res, next) => {
  (async () => {
    let result = await User.checkEmail(req.body.email);

    if (result === null) {
      res.status(501);
      res.send("Account with email " + req.body.email + " does not exist");
      return;
    }

    result = await User.checkPassword(req.body.email, req.body.password);

    if (result.length === 0) {
      res.status(501);
      res.send("Incorrect password");
      return;
    }
    res.send(result[0]);
  })();
});

module.exports = router;
