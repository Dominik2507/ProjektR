const db = require("../db/index");

class Log {
  constructor(logid = null, value = null, datetime = null, parameterid = null, batchid = null) {
    this.logid = logid;
    this.batchid = batchid;
    this.value = value;
    this.datetime = datetime;
    this.parameterid = parameterid;
  }

  async getLog() {
    const sql = `
        SELECT * FROM parameter_log WHERE logid = $1;
        `;

    try {
      const result = await db.query(sql, [this.logid]);
      return result.rows[0];
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getAllParameterLogs() {
    const sql = `
      SELECT parameter_log.*,parameter.unit,parameter.name
      FROM parameter_log
             join parameter on parameter_log.parameterid = parameter.parameterid
      WHERE parameter_log.parameterid = $1 AND parameter_log.batchid=$2;
        `;

    try {
      const result = await db.query(sql, [this.parameterid, this.batchid]);
      return result.rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async CreateLog() {
    const sql = `
        INSERT INTO parameter_log (value, datetime, parameterid, batchid) VALUES ($1, $2, $3, $4) RETURNING *;
        `;

    try {
      const result = await db.query(sql, [
        this.value,
        this.datetime,
        this.parameterid,
        this.batchid
      ]);
      return result.rows[0];
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async UpdateLog() {
    const sql = `
        UPDATE parameter_log SET value = $1, datetime = $2, parameterid = $3 WHERE logid = $4 RETURNING *;
        `;

    try {
      const result = await db.query(sql, [
        this.value,
        this.datetime,
        this.parameterid,
        this.logid,
      ]);
      return result.rows[0];
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async DeleteLog() {
    const sql = `
        DELETE FROM parameter_log WHERE logid = $1;
        `;

    try {
      const result = await db.query(sql, [this.logid]);
      return result.rows[0];
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async LogAverage() {
    const sql = `
        SELECT value FROM parameter_log WHERE parameterid = $1 AND batchid=$2;
        `;

    try {
      const result = await db.query(sql, [this.parameterid, this.batchid]);
      let sum = 0;
      result.rows.forEach((element) => {
        sum += parseFloat(element.value);
      });
      return (sum / result.rows.length).toFixed(2);
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

module.exports = { Log: Log };
