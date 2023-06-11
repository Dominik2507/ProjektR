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

async function postToCardano(processId, lastPhaseId, batchId) {
  console.log("Trazim za proces: ", processId)
  let getAveragesQuery = `
        SELECT parameter.*, 
          (
            SELECT avg(value) 
            FROM parameter_log 
            WHERE parameter_log.parameterid=parameter.parameterid AND parameter_log.batchid=$2
            GROUP BY parameter_log.parameterid
          ) as average
        FROM parameter
        WHERE parameter.processid=$1
    `;
  let averageParamArray;
  try {
    averageParamArray = (await db.query(getAveragesQuery, [processId, batchId])).rows;
    console.log("Lista parametara: ", averageParamArray || "prazno");
  } catch (e) {
    console.log(e);
    return null;
  }
  let getExceptionsQuery = `
        SELECT parameter.*, log.value, log.datetime
        FROM parameter left join parameter_log as log using(parameterid)
        WHERE parameter.processid=$1 AND log.batchid = $2 AND (log.value < parameter.min_value OR log.value>parameter.max_value)
    `;
  let exceptionArray;
  try {
    exceptionArray = (await db.query(getExceptionsQuery, [processId, batchId])).rows;
    console.log("Lista iznimnih logova: ", exceptionArray || "prazno");
  } catch (e) {
    console.log(e);
    return null;
  }

  
  let cardanoObject = {};
  averageParamArray?.forEach((param) => {
    let criticals=exceptionArray.filter(item => item.parameterid==param.parameterid )
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
        averages: [param],
        criticals: criticals || []
      };
    }
  });
  
  let phasesWithComponentIdQuery = `
        SELECT p.*, b.start_datetime, b.end_datetime, c.componentid, c.name as cName 
        FROM process_phase p left join process_component c using(phaseid) left join batch_phases b using(phaseid)
        WHERE p.processid=$1 AND p.phaseid<=$2
    `;
  let phasesArray;
  try {
    phasesArray = (await db.query(phasesWithComponentIdQuery, [
      processId,
      lastPhaseId,
    ])).rows;
    console.log("Faze za proces " + processId, phasesArray || ",nema faza");
  } catch (e) {
    console.log(e);
    return null;
  }
  phasesArray?.forEach((phase) => {
    let criticals=exceptionArray.filter(item => item.componentid=phase.componentid && item.componentid!==null)
    let componentAvgArray = averageParamArray ? averageParamArray.filter(
      (avgRow) => avgRow.componentid === phase.componentid && avgRow.componentid!==null
    ) : [];

    if(cardanoObject[phase.phaseid]===undefined){
      
      cardanoObject[phase.phaseid] = {
        info:{
          phase: phase.name,
          start: phase.start_datetime,
          end: phase.end_datetime,
          description: phase.description,
          components: {
            component: phase.cName,
            averages: componentAvgArray,
            criticals: criticals || []
          },
        },
        averages: [],
        criticals: [],
        
      };
    }
    else if (cardanoObject[phase.phaseid]?.info === undefined) {

      cardanoObject[phase.phaseid].info = {
        phase: phase.name,
        start: phase.start_datetime,
        end: phase.end_datetime,
        description: phase.description,
        components: {
          component: phase.cName,
          averages: componentAvgArray,
          criticals: criticals || [],
        },
      };
    }
  });

  console.log("Dohvacam transakcije za proces: ",processId)
  let sql = `
        SELECT transactionid as hash
        FROM blockchain
        WHERE processid=$1
    `;
  let previousTransactionsArray;
  try {
    previousTransactionsArray = (await db.query(sql, [processId])).rows;
    console.log("Ima prethodnih transakcija",previousTransactionsArray?.length || "0");
    console.log("Transakcije",previousTransactionsArray);
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

    console.log("Stvoreni JSON objekt koji ide na node,")
    console.log(JSON.stringify({
      "1": cardanoObject,
      "2": previousTransactionsArray,
      }))
        
    let hash="6b4ca2c4025a4d8c8aca4c4c1766eee63a1ccaf3a6e5ed5a923c9a8bcff3edd5"

    let saveNewTransaction=`
        INSERT INTO blockchain(processid, transactionid)
        VALUES ($1, $2)
    `;
  try {
    let result = await db.query(saveNewTransaction, [processId, hash]);
    //console.log("result: ", result);
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
        WHERE processid = $1
        ORDER BY processid desc
        `;

    try {
      const result = await db.query(sql, [id]);
      console.log(result.rows[0]);

      res.send(result.rows[0]);
    } catch (e) {
      console.log(e);
      res.send(null);
    }
  })();
});

router.get("/getProcessHash/all/:id", (req, res) => {
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
        WHERE processid = $1
        ORDER BY processid desc
        `;

    try {
      const result = await db.query(sql, [id]);
      console.log(result.rows[0]);

      res.send(result.rows);
    } catch (e) {
      console.log(e);
      res.send(null);
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
    console.log("Given body: ", body)
    let processId=body.processid;
    let activePhase=body.activePhase;
    let nextPhase=body.nextPhase;
    let batchId=body.batchId;
  
    // SET START AND END
    let today=new Date();
    let sql=`
      UPDATE batch_phases
      SET end_datetime=$1
      WHERE phaseid=$2 AND batchid=$3;
    `
    try {
      const result = await db.query(sql, [today, activePhase, batchId]);
    }catch (e) {
      console.log(e);
      return null;
    }

    sql=`
      UPDATE batch_phases
      SET start_datetime=$1
      WHERE phaseid=$2 AND batchid=$3
    `
    try {
      const result = await db.query(sql, [today, nextPhase, batchId]);
    }catch (e) {
      console.log(e);
      return null;
    }

    sql=`
      UPDATE batch
      SET activephaseid=$1
      WHERE processid=$2 AND batchid=$3
    `
    try {
      const result = await db.query(sql, [nextPhase, processId, batchId]);
    }catch (e) {
      console.log(e);
      return null;
    }

    let hash= await postToCardano(processId, activePhase)
      
    res.send({hash:hash})
    
  })

  router.post("/beginFirstPhase", async (req,res) => {
    let body = req.body;
    console.log("Req body",body)
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
      let batchId=body.batchId;
    
      // SET START AND END
      let today=new Date();
      let sql=`
      UPDATE batch_phases
      SET start_datetime=$1
      WHERE phaseid=$2 AND batchid=$3;
      
    `
      try {
        const result = await db.query(sql, [today, nextPhase, batchId]);
      }catch (e) {
        console.log(e);
        return null;
      }
      sql=`
        UPDATE batch
        SET start_datetime=$1, activephaseid=$2
        WHERE processid=$3 and batchid=$4
      `
      try {
        const result = await db.query(sql, [today, nextPhase, processId, batchId]);
        res.send(result);
      }catch (e) {
        console.log(e);
        res.status(501)
        res.send("Server error");
        return null;
      }
      
      
      
    })

    router.post("/endLastPhase", async (req,res) => {
        let body = req.body;
        console.log("Req body",body)
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
          let batchId=body.batchId;
        
          // SET START AND END
          let today=new Date();
          let sql=`
            UPDATE batch_phases
            SET end_datetime=$1
            WHERE phaseid=$2 AND batchid=$3;
            
          `
          try {
            const result = await db.query(sql, [today, activePhase, batchId]);
          }catch (e) {
            console.log(e);
            return null;
          }
          sql=`
            UPDATE batch
            SET end_datetime=$1, activephaseid=null
            WHERE processid=$2 AND batchid=$3;
          `
          try {
            const result = await db.query(sql, [today, processId, batchId]);
          }catch (e) {
            console.log(e);
            return null;
          }
          let hash= await postToCardano(processId, activePhase)
            
          res.send({hash:hash})
          
        })
  
  module.exports = router;
