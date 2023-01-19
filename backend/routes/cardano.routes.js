const express = require("express");
const router = express.Router();
const os = require("os");
const path = require("path");
const fs = require("fs");

const db = require("../db/index");

/* 
=========================================
Dok je podignut node

const CardanoPreviewTestnetUtils = require("@tim1/cardano-testnet-tim1")
let nodeUtils = new CardanoPreviewTestnetUtils({
        shelleyGenesisPath : path.join(os.homedir(),"cardano","testnet","shelley-genesis.json"),
        socketPath : path.join(os.homedir(), "cardano", "testnet", "db", "node.socket"), 
        dir : path.join(os.homedir(), "cardanoTransactions", "jsTransactions"), 
        projectId : "previewQowKfRw7MN9prwcWQN6z3rNpPW33Quj1"
}) 
=======================================
*/

async function postToCardano(processId, lastPhaseId) {
  let getAveragesQuery = `
        SELECT parameter.*, (SELECT avg(value) FROM parameter_log WHERE parameter_log.parameterid=parameter.parameterid GROUP BY parameter_log.parameterid) as average
        FROM parameter
        WHERE parameter.processid=$1
    `;
  let averageParamArray;
  try {
    averageParamArray = await db.query(getAveragesQuery, [processId]).rows;
    console.log(averageParamArray);
  } catch (e) {
    console.log(e);
    return null;
  }

  let cardanoObject = {};
  averageParamArray?.foreach((param) => {
    if (
      param.phaseid &&
      cardanoObject[param.phaseid] &&
      cardanoObject[param.phaseid].averages
    ) {
      cardanoObject[param.phaseid].averages.push(param);
    } else if (param.phaseid && cardanoObject[param.phaseid]) {
      cardanoObject[param.phaseid].averages = [param];
    } else if (param.phaseid) {
      cardanoObject[param.phaseid] = {
        averages: [],
        criticals: [],
        components: [],
      };
    }
  });
  let phasesWithComponentIdQuery = `
        SELECT p.*, c.componentid, c.name as cName  FROM process_phase p natural join process_component c
        WHERE p.processid=$1 AND p.phaseid<=$2
    `;
  let phasesArray;
  try {
    phasesArray = await db.query(phasesWithComponentIdQuery, [
      processId,
      lastPhaseId,
    ]).rows;
    console.log(phasesArray);
  } catch (e) {
    console.log(e);
    return null;
  }
  phasesArray?.foreach((phase) => {
    if (cardanoObject[phase.phaseid].info === undefined) {
      let componentAvgArray = averageParamArray.filter(
        (avgRow) => avgRow.componentid === phase.componentid
      );
      cardanoObject[phase.phaseid].info = {
        phase: phase.name,
        start: phase.start_datetime,
        end: phase.end_datetime,
        description: phase.description,
        components: {
          component: phase.cName,
          averages: componentAvgArray,
          criticals: [],
        },
      };
    }
  });

  let previousTransactions = `
        SELECT transactionid as hash
        FROM blockchain
        WHERE processid=$1
    `;
  let previousTransactionsArray;
  try {
    previousTransactionsArray = await db.query(previousTransactions, [
      processId,
    ]).rows;
    console.log(previousTransactions);
  } catch (e) {
    console.log(e);
    return null;
  }


   /*  
   =========================================
    Dok je podignut node

    let hash = nodeUtils.makeATransaction(
        {
        "1": JSON.stringify(cardanoObject),
        "2": JSON.stringify(previousTransactionsArray),
        },
        fs.readFileSync(path.join(os.homedir(), "cardanoWalletAddress", "payment.addr")),
        path.join(os.homedir(), "cardanoWalletAddress", "payment.skey")
    ) 
    ======================================
    */

    console.log(
        JSON.stringify({
        "1": JSON.stringify(cardanoObject),
        "2": JSON.stringify(previousTransactionsArray),
        }))
    let hash="6b4ca2c4025a4d8c8aca4c4c1766eee63a1ccaf3a6e5ed5a923c9a8bcff3edd5"

    let saveNewTransaction=`
        INSERT INTO blockchain(processid, transactionid)
        VALUES ($1, $2)
    `;
  try {
    let result = await db.query(saveNewTransaction, [processId, hash]).rows;
    console.log("saved: ", result);
  } catch (e) {
    console.log(e);
    return null;
  }

  return hash;
}

router.get("/getProcessHash/:id", (req, res) => {
  (async () => {
    let id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400);
      res.send("Please check your request, id should be number");
      return;
    }

    const sql = `
        SELECT *
        FROM blockchain
        WHERE id = $1
        ORDER BY phaseid desc
        `;

    try {
      const result = await db.query(sql, [id]);
      console.log(result.rows[0]);

      return result.rows[0];
    } catch (e) {
      console.log(e);
      return null;
    }
  })();
});

router.post("/advancePhase", async (req,res) => {
  let body = req.body;
  /*
    =================
    body={
      processid: id,
      activePhase: id,
      nextPhase: id
    }
    =================
    */
  
    let processId=body.processid;
    let activePhase=body.activePhase;
    let nextPhase=body.nextPhase;
  
    // SET START AND END
    let today=new Date();
    let sql=`
      UPDATE process_phase
      SET end_datetime=$1, active='f'
      WHERE phaseid=$2;
      
    `
    try {
      const result = await db.query(sql, [today, activePhase]);
    }catch (e) {
      console.log(e);
      return null;
    }

    sql=`
      UPDATE process_phase
      SET start_datetime=$1, active='t'
      WHERE phaseid=$2
    `
    try {
      const result = await db.query(sql, [today, nextPhase]);
    }catch (e) {
      console.log(e);
      return null;
    }
    let hash= await postToCardano(processId, activePhase)
      
    res.send({hash:hash})
    
  })

  router.post("/beginFirstPhase", async (req,res) => {
    let body = req.body;
    console.log(body)
    /*
      =================
      body={
        processid: id,
        activePhase: 0,
        nextPhase: id
      }
      =================
      */
    
      let processId=body.processid;
      let nextPhase=body.nextPhase;
    
      // SET START AND END
      let today=new Date();
      let sql=`
        UPDATE process_phase
        SET start_datetime=$1, active='t'
        WHERE phaseid=$2
      `
      try {
        const result = await db.query(sql, [today, nextPhase]);
      }catch (e) {
        console.log(e);
        return null;
      }
      let hash=""
      res.send({hash:hash})
      
    })

    router.post("/endLastPhase", async (req,res) => {
        let body = req.body;
        /*
          =================
          body={
            processid: id,
            activePhase: id,
            nextPhase: 0
          }
          =================
          */
        
          let processId=body.processid;
          let activePhase=body.activePhase;
        
          // SET START AND END
          let today=new Date();
          let sql=`
            UPDATE process_phase
            SET end_datetime=$1, active='f'
            WHERE phaseid=$2;
            
          `
          try {
            const result = await db.query(sql, [today, activePhase]);
          }catch (e) {
            console.log(e);
            return null;
          }
          sql=`
            UPDATE process
            SET end_datetime=$1
            WHERE processid=$2;
          `
          try {
            const result = await db.query(sql, [today, processId]);
          }catch (e) {
            console.log(e);
            return null;
          }
          let hash= await postToCardano(processId, activePhase)
            
          res.send({hash:hash})
          
        })
  
  module.exports = router;
