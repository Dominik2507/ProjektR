const express = require("express");
const router = express.Router();
const db = require("../db/index");

router.post("/add", async function (req, res) {
   console.log("Adding report: ", req.body);
    let sql = `INSERT INTO reports (processid, reportedbyid, description)
    VALUES ($1, $2, $3);`;

    try {
      let result = await db.query(sql, [req.body.processid, req.body.userid, req.body.description]);
      res.send(result);
    } catch (e) {
        console.log(e);
      res.status(501);
      res.send("Problems when creating phase. Please try again later.");
    }
});

router.get("/all", async function (req, res) {
   
    let sql = `SELECT reports.*, process.name as processName, 
                    (SELECT row_to_json(user_combined) FROM user_combined WHERE user_combined.userid=process.userid) as owner,
                    (SELECT row_to_json(user_combined) FROM user_combined WHERE user_combined.userid=reports.reportedbyid) as reportedBy
                FROM reports LEFT JOIN process using(processid)`;

    try {
      let result = await db.query(sql, []);
      res.send(result.rows);
    } catch (e) {
      res.status(501);
      res.send("Problems when creating phase. Please try again later.");
    }
});

router.get("/byId/:processid", async function (req, res) {
   
    let sql = `SELECT reports.*, process.name as processName, (SELECT row_to_json(user_combined) FROM user_combined WHERE user_combined.userid=process.userid) as owner
                FROM reports LEFT JOIN process using(processid)
                WHERE reports.processid=$1`;

    try {
      let result = await db.query(sql, [req.params.processid]);
      res.send(result.rows[0]);
    } catch (e) {
      res.status(501);
      res.send("Problems when creating phase. Please try again later.");
    }
});

router.get("/resolve/:reportid", async function (req, res) {
   
    let sql = `DELETE FROM reports WHERE reportid=$1`;

    try {
      let result = await db.query(sql, [req.params.reportid]);
      res.send(result);
    } catch (e) {
      res.status(501);
      res.send("Problems when creating phase. Please try again later.");
    }
});

module.exports = router;