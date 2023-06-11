const db = require("../db/index");

class Process {
  constructor(
    processid,
    name,
    verification,
    description,
    userId
  ) {
    this.name = name;
    this.processid = processid;
    this.verification = verification;
    this.description = description;
    this.userId = userId;
  }

  static async getUserFavProcess(userId) {
    const sql = `
      select favorite_templates.*, name, description
      from favorite_templates
             JOIN process ON process.processid = favorite_templates.processid
             JOIN user_data ON favorite_templates.userid = user_data.userid
      WHERE favorite_templates.userid = $1
        `;

    try {
      const result = await db.query(sql, [userId]);
      console.log(result);
      return result.rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  static async getUserProcess(userId) {
    const sql = `
        SELECT * FROM process where userid = $1;
        `;

    try {
      const result = await db.query(sql, [userId]);
      return result.rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  static async deleteFav(processId, userId) {
    const sql = `
        DELETE FROM favorite_templates
        WHERE processid = $1 AND userid = $2; 
        `;

    try {
      const result = await db.query(sql, [processId, userId]);
      return !!result.rows;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async saveFav(processId, userId) {
    const sql = `
        INSERT INTO favorite_templates
        (processid, userid)
        VALUES 
        ($1,$2);
        `;

    try {
      const result = await db.query(sql, [processId, userId]);
      return !!result.rows;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async getFavProcesses(id) {
    let sql = `
        SELECT processId FROM favorite_templates WHERE userid = $1
        `;

    try {
      let result = await db.query(sql, [id]);
      return result.rows;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async insertNewProcess() {
    let sql = `
        INSERT INTO process 
        (name, description, verification, userId)
        VALUES
        ($1,$2,$3,$4);
        `;

    try {
      let result = await db.query(sql, [
        this.name,
        this.description,
        this.verification,
        this.userId,
      ]);
      return result.rowCount > 0;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async getProcess(id) {
    let sql = `
        SELECT process_with_phases.*, (SELECT row_to_json(user_combined) FROM user_combined WHERE user_combined.userid=process_with_phases.userid) as creator 
        FROM process_with_phases 
        WHERE processid = $1;
        `;

    try {
      let result = await db.query(sql, [id]);
      return result.rows;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async getProcessOfUser(id) {
    let sql = `
      SELECT process.*, (SELECT row_to_json(user_combined) FROM user_combined WHERE user_combined.userid=process.userid) as creator
      FROM process
      WHERE userid = $1;
        `;

    try {
      let result = await db.query(sql, [id]);
      return result.rows;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async getAllProcesses() {
    let sql = `SELECT process.*, 
              (SELECT row_to_json(user_combined) FROM user_combined WHERE user_combined.userid=process.userid) as creator,
	            (SELECT transactionid FROM blockchain bc WHERE bc.processid=process.processid ORDER BY id desc LIMIT 1) as hash
              FROM process
                join user_data on process.userid = user_data.userid`;

    try {
      let result = await db.query(sql, []);
      console.log("results", result.rows);
      return result.rows;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async addProcess(phases) {
    let sql = `
        INSERT INTO process 
        (name,verification, description, userId)
        VALUES
        ($1,$2,$3,$4) RETURNING processid;
        `;

    try {
      let result = await db.query(sql, [
        this.name,
        'none',
        this.description,
        this.userId,
      ]);
      this.processid = result.rows[0].processid;

      const batchSql = `INSERT INTO batch (start_datetime, end_datetime, activephaseid, processid)
        VALUES (null, null, null, $1) RETURNING batchid;`;
        
        const batchResult = await db.query(batchSql, [
          this.processid
        ]);
        const batchid = batchResult.rows[0].batchid;

      phases?.forEach(async (phase) => {
        const phaseSql = `INSERT INTO process_phase (name, location, description, processid)
        VALUES ($1, $2, $3, $4)
        RETURNING phaseid;`;

        const phaseResult = await db.query(phaseSql, [
          phase.name,
          phase.location,
          phase.description,
          this.processid,
        ]);
        const phaseId = phaseResult.rows[0].phaseid;

        const batchPhasesSql = `INSERT INTO batch_phases (phaseid, batchid, start_datetime, end_datetime)
        VALUES ($1, $2, null, null)`;
        
        const batchPhasesResult = await db.query(batchPhasesSql, [
          phaseId,
          batchid
        ]);

        phase.params?.forEach(async (parameter) => {
          const parameterSql = `INSERT INTO parameter (name, unit, max_value, min_value, componentid, processid, phaseid)
          VALUES ($1, $2, $3, $4, $5, $6, $7)`;
          const parameterResult = await db.query(parameterSql, [
            parameter.paramName,
            parameter.paramDesc,
            parameter.maxValue,
            parameter.minValue,
            null,
            this.processid,
            phaseId,
          ]);
        });

        phase.components?.forEach(async (component) => {
          const componentSql = `INSERT INTO process_component (name, phaseid)
          VALUES ($1, $2)
          RETURNING componentid;`;
          const componentResult = await db.query(componentSql, [
            component.name,
            phaseId,
          ]);
          const componentId = componentResult.rows[0].componentid;

          component.params?.forEach(async (parameter) => {
            const parameterSql = `INSERT INTO parameter (name, unit, max_value, min_value, componentid, processid, phaseid)
            VALUES ($1, $2, $3, $4, $5, $6, $7)`;
            const parameterResult = await db.query(parameterSql, [
              parameter.paramName,
              parameter.paramDesc,
              parameter.maxValue,
              parameter.minValue,
              componentId,
              this.processid,
              null,
            ]);
          });
        });
      });

      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

module.exports = { Process: Process };
