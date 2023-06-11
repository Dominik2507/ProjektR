const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");

router.post("/", (req, res, next) => {
  (async () => {
    let emailExists = await User.checkEmail(req.body.email);
    if (emailExists !== null) {
      res.status(501);
      res.send(emailExists);
      return;
    }

    let user = new User(
      req.body.email,
      req.body.password,
      req.body.type,
      req.body.firstName,
      req.body.lastName,
      req.body.ceo,
      req.body.name
    );

    let result = await user.insertNewUser();
    if (!result) {
      res.status(501);
      res.send("Problems with sign in. Please try again later.");
      return;
    }
    res.send("ok");
  })();
});

module.exports = router;
