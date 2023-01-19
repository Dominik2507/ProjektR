const db = require("../db/index");

class ProcessComponent {
  constructor({ componentid, name, phaseid }) {
    this.componentid = componentid;
    this.name = name;
    this.phaseid = phaseid;
  }

  async getById() {
    const sql = `
      SELECT * FROM process_component WHERE componentid = $1;
    `;

    try {
      const result = await db.query(sql, [this.componentid]);
      return result.rows[0];
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async addProcessComponent() {
    const sql = `
			INSERT INTO process_component (name, phaseid)
			VALUES ($1, $2)
			RETURNING componentid;
		`;

    try {
      const result = await db.query(sql, [this.name, this.phaseid]);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  static async getProcessComponentsByProcessPhaseId() {
    const sql = `
			SELECT * FROM process_component WHERE phaseid = $1;
		`;

    try {
      const result = await db.query(sql, [this.phaseid]);
      return result.rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

module.exports = { ProcessComponent: ProcessComponent };
