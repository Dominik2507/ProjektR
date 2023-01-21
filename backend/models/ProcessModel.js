const db = require("../db/index");

class Process {
  constructor(
    processid,
    name,
    start_datetime,
    end_datetime,
    description,
    userId
  ) {
    this.name = name;
    this.processid = processid;
    this.start_datetime = start_datetime;
    this.end_datetime = end_datetime;
    this.description = description;
    this.userId = userId;
  }

  static async getUserFavProcess(userId) {
    const sql = `
        select favorite_templates.*, name, start_datetime, end_datetime,description
        from favorite_templates
        JOIN process ON process.processid = favorite_templates.processid
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
        (name,start_datetime, end_datetime, description, userId)
        VALUES
        ($1,$2,$3,$4,$5);
        `;

    try {
      let result = await db.query(sql, [
        this.name,
        this.start_datetime,
        this.end_datetime,
        this.description,
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
        SELECT * FROM process_with_phases where processid = $1;
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
        SELECT * FROM process where userid = $1;
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
    let sql = `SELECT process.*, user_data.firstname || ' ' || user_data.lastname AS creator, transactionid as hash
               FROM process
                      left join blockchain using (processid)
                      join user_data on process.userid = user_data.userid;`;

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
        (name,start_datetime, end_datetime, description, userId)
        VALUES
        ($1,$2,null,$3,$4) RETURNING processid;
        `;

    try {
      let result = await db.query(sql, [
        this.name,
        this.start_datetime,
        this.description,
        this.userId,
      ]);
      this.processid = result.rows[0].processid;

      phases?.forEach(async (phase) => {
        const phaseSql = `INSERT INTO process_phase (name, start_datetime, end_datetime, description, active, processid)
        VALUES ($1, null, null, $2, $3, $4)
        RETURNING phaseid;`;
        const phaseResult = await db.query(phaseSql, [
          phase.name,
          phase.description,
          "f",
          this.processid,
        ]);
        const phaseId = phaseResult.rows[0].phaseid;

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
