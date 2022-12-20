const db = require("../db/index");

module.exports = class User{
    constructor(processid,name,start_datetime, end_datetime, description,userId){
        this.name = name;
        this.processid = processid;
        this.start_datetime=start_datetime;
        this.end_datetime=end_datetime;
        this.description=description;
        this.userId=userId;
    }


    async insertNewProcess(){
        let sql = `
        INSERT INTO process 
        (name,start_datetime, end_datetime, description, userId)
        VALUES
        ($1,$2,$3,$4,$5);
        `;

        try{
            let result = await db.query(sql, [this.name, this.start_datetime, this.end_datetime, this. description, this.userId]);
            return result.rowCount > 0;
        }catch (e){
            console.log(e);
            return false;
        }
    }

    static async getProcess(id){
        let sql = `
        SELECT * FROM process where userid = $1;
        `;

        try{
            let result = await db.query(sql, [id]);
            return result.rows;
        }catch (e){
            console.log(e);
            return false;
        }
    }

    static async getProcessOfUser(id){
        let sql = `
        SELECT * FROM process where processid = $1;
        `;

        try{
            let result = await db.query(sql, [id]);
            return result.rows;
        }catch (e){
            console.log(e);
            return false;
        }
    }
    static async getAllProcess(){
        let sql = `
        SELECT * FROM process;
        `;

        try{
            let result = await db.query(sql, []);
            return result.rows;
        }catch (e){
            console.log(e);
            return false;
        }
    }
}