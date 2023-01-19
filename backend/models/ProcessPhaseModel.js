const db = require("../db/index");

class ProcessPhase {
  constructor({
    phaseid,
    name,
    start_datetime,
    end_datetime,
    description,
    active,
    processid,
  }) {
    this.phaseid = phaseid;
    this.name = name;
    this.start_datetime = start_datetime;
    this.end_datetime = end_datetime;
    this.description = description;
    this.active = active;
    this.processid = processid;
  }

  async CreateProcessPhase() {
    const sql = `
			INSERT INTO process_phase (name, start_datetime, end_datetime, description, active, processid)
			VALUES ($1, $2, $3, $4, $5, $6)
			RETURNING phaseid;
		`;

    try {
      const result = await db.query(sql, [
        this.name,
        this.start_datetime,
        this.end_datetime,
        this.description,
        this.active,
        this.processid,
      ]);
      this.phaseid = result.rows[0].phaseid;
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async GetProcessPhases() {
    const sql = `
			SELECT * FROM process_phase WHERE phaseid = $1;
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

module.exports = { ProcessPhase: ProcessPhase };
