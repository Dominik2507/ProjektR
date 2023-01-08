const db = require("../db/index");

class ProcessComponent {
  constructor({ componentid, name, phaseid, has_componentid }) {
    this.componentid = componentid;
    this.name = name;
    this.phaseid = phaseid;
    this.has_componentid = has_componentid;
  }

  async addProcessComponent() {
    const sql = `
			INSERT INTO process_component (name, phaseid, has_componentid)
			VALUES ($1, $2, $3)
			RETURNING componentid;
		`;

    try {
      const result = await db.query(sql, [
        this.name,
        this.phaseid,
        this.has_componentid,
      ]);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  static async getProcessComponentsByProcessPhaseId() {
    const sql = `
			SELECT * FROM process_component WHERE has_componentid = $1;
		`;

    try {
      const result = await db.query(sql, [this.has_componentid]);
      return result.rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

module.exports = { ProcessComponent: ProcessComponent };
