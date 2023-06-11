const db = require("../db/index");

module.exports = class User{
    constructor(email, password, type="", firstName="", lastName="", ceo="", name=""){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.ceo=ceo;
        this.name=name;
        this.type=type;
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
            SELECT * FROM user_data LEFT JOIN user_person using(userid) LEFT JOIN user_company using(userid) WHERE email = $1 AND password = $2;
        `;

        try {
            let result = await db.query(sql, [email, password]);
            return result.rows;

        } catch (e){
            return false;
        }
    }

    async insertNewUser(){
        let sql = `
        INSERT INTO user_data 
        (email, password, type)
        VALUES
        ($1,$2,$3) RETURNING userid;
        `;

        try{
            
            let result = await db.query(sql, [this.email, this.password, this.type]);
            
            if(result.rowCount==1){
                let userid = result.rows[0].userid;;
        
                if(this.type=="personal"){
                    sql = `
                        INSERT INTO user_person
                        (firstname, lastname, userid)
                        VALUES
                        ($1,$2,$3);
                    `;
                    result = await db.query(sql, [this.firstName, this.lastName, userid]);
                }else if( this.type=="business"){
                    sql = `
                        INSERT INTO user_company
                        (name, ceo, userid)
                        VALUES
                        ($1,$2,$3);
                    `;
                    result = await db.query(sql, [this.name, this.ceo, userid]);
                }
            }
            return result.rowCount;
        }catch (e){
            console.log(e);
            return false;
        }
    }

    async getUser(){
        let sql = `
        SELECT user_data.userid, user_data.type, user_data.email, user_person.firstname, user_person.lastname, user_company.name, user_company.ceo 
        FROM user_data LEFT JOIN user_company using(userid) LEFT JOIN user_person using(userid) 
        WHERE email = $1 AND password = $2;
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