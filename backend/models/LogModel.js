const db = require("../db/index");

class Log {
  constructor({ logid, value, datetime, parameterid }) {
    this.logid = logid;
    this.value = value;
    this.datetime = datetime;
    this.parameterid = parameterid;
  }

  static async getLog() {
    const sql = `
        SELECT * FROM log WHERE logid = $1;
        `;

    try {
      const result = await db.query(sql, [this.logid]);
      return result.rows[0];
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  static async getAllParameterLogs() {
    const sql = `
        SELECT * FROM log WHERE parameterid = $1;
        `;

    try {
      const result = await db.query(sql, [this.parameterid]);
      return result.rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async CreateLog() {
    const sql = `
        INSERT INTO log (value, datetime, parameterid) VALUES ($1, $2, $3) RETURNING *;
        `;

    try {
      const result = await db.query(sql, [
        this.value,
        this.datetime,
        this.parameterid,
      ]);
      return result.rows[0];
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async UpdateLog() {
    const sql = `
        UPDATE log SET value = $1, datetime = $2, parameterid = $3 WHERE logid = $4 RETURNING *;
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

  static async DeleteLog() {
    const sql = `
        DELETE FROM log WHERE logid = $1;
        `;

    try {
      const result = await db.query(sql, [this.logid]);
      return result.rows[0];
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  static async LogAverage() {
    const sql = `
        SELECT value FROM log WHERE parameterid = $1;
        `;

    try {
      const result = await db.query(sql, [this.parameterid]);
      let sum = 0;
      result.forEach((element) => {
        sum += parseFloat(element.value);
      });
      return sum / result.length;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
