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
    res.send(result);
  })();
});

router.put("/byId", (req, res, next) => {
  (async () => {
    console.log("Updating process: ", req.body);
    let body= req.body;
    
    let process_sql = `UPDATE process SET name = $1, description = $2, verification = $3 WHERE processId = $4;`;
    let batch_sql = `UPDATE batch SET start_datetime = $1, end_datetime = $2 WHERE batchId = $3;`
    let phase_sql = `UPDATE process_phase SET name = $1, description = $2, location = $3 WHERE phaseId = $4;`
    let batch_phases_sql = `UPDATE batch_phases SET start_datetime = $1, end_datetime = $2 WHERE batchId = $3 AND phaseId = $4;`
    let component_sql = `UPDATE process_component SET name = $1 WHERE componentId = $2;`
    let parameter_sql = `UPDATE parameter SET max_value = $1, min_value = $2, name = $3, unit = $4 WHERE parameterId = $5;`
    
    try{
      await db.query(process_sql, [body.name, body.description, body.verification, body.processid]);
      await db.query(batch_sql, [body.start_datetime, body.end_datetime, process.batchid]);

      for(let phase of req.body.phases || []){
        await db.query(phase_sql, [phase.name, phase.description, phase.location, phase.phaseid]);
        await db.query(batch_phases_sql, [phase.start_datetime, phase.end_datetime, body.batchid, phase.phaseid])
      
        for(let component of phase.components || []){
          await db.query(component_sql, [component.name, component.componentid]);
        }
      }

      for(let parameter of req.body.params || []){
        await db.query(parameter_sql, [parameter.max_value, parameter.min_value, parameter.name, parameter.unit, parameter.parameterid]);
      }

       res.status(200)
       res.send({msg: "Success"});
    }catch (e){
        console.log(e);
        res.send(null)
    }
  })();
});

router.post("/create", (req, res, next) => {
  (async () => {
    let process = new Process(
      null,
      req.body.name,
      req.body.verification,
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

router.post("/bulk/new",(req, res, next) => {
  (async () => {
    if (Number.isNaN(req.body.processid)) {
      res.status(400);
      res.send("Please check your request, id should be number");
      return;
    }

    const phaseid_list=req.body.phaseid_list;
    

    let sql = `INSERT INTO batch (start_datetime, end_datetime, activephaseid, processid)
    VALUES (null, null, null, $1) RETURNING batchid;`;

    try {
      let result = await db.query(sql, [req.body.processid]);
      const batchid = result.rows[0].batchid;
      console.log("Created batch with id: ", batchid);

      sql = `INSERT INTO batch_phases (start_datetime, end_datetime, batchid, phaseid)
          VALUES (null, null, $1, $2)`;
      
      console.log("Creating batch_phases for phases: ", req.body.phaseid_list)

      for(let phaseid of phaseid_list ){
        try {
          result = await db.query(sql, [batchid, phaseid]);  
        } catch (error) {
          res.status(501);
          res.send("Problems with server. Please try again later.");
        }
        
      }
      res.status(200);
      res.send("Succesfully added.");
    } catch (e) {
      res.status(501);
      res.send("Problems with server. Please try again later.");
    }
  })();
});

router.delete("/byId/:id", async function (req, res) { 
    
  let sql = `DELETE FROM process WHERE processid=$1`;

  try{
      let result = await db.query(sql, [req.params.id]);

      res.send(result);
  }catch (e){
      console.log(e);
      res.send(null)
  }
  
});

module.exports = router;
