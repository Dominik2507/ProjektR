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
    let sql = `SELECT * FROM process;`;

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
        ($1,$2,$3,$4,$5); RETURNING processid;
        `;

    try {
      let result = await db.query(sql, [
        this.name,
        this.start_datetime,
        this.end_datetime,
        this.description,
        this.userId,
      ]);
      this.processid = result.rows[0].processid;

      phases.forEach(async (phase) => {
        const phaseSql = `INSERT INTO phase (start_datetime, end_datetime, description, active, processid)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING phaseid;`;
        const phaseResult = await db.query(phaseSql, [
          phase.start_datetime,
          phase.end_datetime,
          phase.description,
          phase.active,
          this.processid,
        ]);
        const phaseId = phaseResult.rows[0].phaseid;

        phase.components.forEach(async (component) => {
          const componentSql = `INSERT INTO process_component (name, phaseid, has_componentid)
          VALUES ($1, $2, $3)
          RETURNING componentid;`;
          const componentResult = await db.query(componentSql, [
            component.name,
            phaseId,
            phaseId,
          ]);
          const componentId = componentResult.rows[0].componentid;

          component.parameters.forEach(async (parameter) => {
            const parameterSql = `INSERT INTO parameter (name, unit, max_value, min_value, componentid, processid, phaseid)
            VALUES ($1, $2, $3, $4, $5, $6, $7)`;
            const parameterResult = await db.query(parameterSql, [
              parameter.name,
              parameter.unit,
              parameter.max_value,
              parameter.min_value,
              componentId,
              this.processid,
              phaseId,
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
