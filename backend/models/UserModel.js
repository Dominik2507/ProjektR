const db = require("../db/index");

module.exports = class User{
    constructor(firstName, lastName, email,password){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    static async checkEmail(email){
        let sql = `
            SELECT * FROM user_data where email = $1
        `;

        try{
            let result =await db.query(sql,[email]);
            if(result.rowCount > 0)
                return "Account with that email already exists";

            return null;

        }catch (e){
            console.log(e);
        }
    }

    static async checkPassword(email,password){
        let sql = `
            SELECT * FROM user_data WHERE email = $1 AND password = $2;
        `;

        try {
            let result = await db.query(sql, [email, password]);

            if (result.rowCount === 0)
                return "Incorrect password";

            return null;

        } catch (e){
            return false;
        }
    }

    async insertNewUser(){
        let sql = `
        INSERT INTO user_data 
        (firstName,lastName, email,password)
        VALUES
        ($1,$2,$3,$4);
        `;

        try{
            let result = await db.query(sql, [this.firstName,this.lastName,this.email, this.password]);
            return result.rowCount > 0;
        }catch (e){
            console.log(e);
            return false;
        }
    }

    async getUser(){
        let sql = `
        SELECT * FROM user_data where email = $1 AND password = $2;
        `;

        try{
            let result = await db.query(sql, [this.email,this.password]);
            return result.rows > 0;
        }catch (e){
            console.log(e);
            return false;
        }
    }
}