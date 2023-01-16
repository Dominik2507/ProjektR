const db = require("../db/index");

class Parameter {
  constructor({
    parameterid,
    name,
    unit,
    max_value,
    min_value,
    componentid,
    processid,
    phaseid,
  }) {
    this.parameterid = parameterid;
    this.name = name;
    this.unit = unit;
    this.max_value = max_value;
    this.min_value = min_value;
    this.componentid = componentid;
    this.processid = processid;
    this.phaseid = phaseid;
  }

  static async getParameter() {
    const sql = `
        SELECT * FROM parameter WHERE parameterid = $1;
        `;

    try {
      const result = await db.query(sql, [this.parameterid]);
      return result.rows[0];
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  static async getParametersByProcessId() {
    const sql = `
        SELECT * FROM parameter WHERE processid = $1;
        `;

    try {
      const result = await db.query(sql, [this.processid]);
      return result.rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async addParameter() {
    const sql = `
			INSERT INTO parameter (name, unit, max_value, min_value, componentid, processid, phaseid)
			VALUES ($1, $2, $3, $4, $5, $6, $7)
			RETURNING parameterid;
		`;

    try {
      const result = await db.query(sql, [
        this.name,
        this.unit,
        this.max_value,
        this.min_value,
        this.componentid,
        this.processid,
        this.phaseid,
      ]);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async addLog(value, date) {
    const sql = `INSERT INTO parameter_log (value, datetime, parameterid) VALUES ($1, $2, $3)`;

    try {
      const result = await db.query(sql, [value, date, this.parameterid]);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

module.exports = { Parameter: Parameter };
