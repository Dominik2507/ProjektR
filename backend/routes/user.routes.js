const express = require("express");
const router = express.Router();
const db = require("../db/index");

router.get("/all", async function (req, res) {
    
    
        let sql = `SELECT * FROM user_data 
                            LEFT JOIN user_company using(userid)
                            LEFT JOIN user_person using(userid);`;

        try{
            let result = await db.query(sql);
            res.send(result.rows);
        }catch (e){
            console.log(e);
            res.send(null)
        }
        

});

router.get("/byId/:id", async function (req, res) { 
    
    let sql = `SELECT * 
                FROM user_data 
                            LEFT JOIN user_company using(userid)
                            LEFT JOIN user_person using(userid)
                WHERE userid=$1`;


    try{
        let result = await db.query(sql, [req.params.id]);
        let user=result.rows[0];

        res.send(user);
    }catch (e){
        console.log(e);
        res.send(null)
    }
    

});

router.put("/byId", async function (req, res) { 
    console.log("i got update command", req.body)
    let sql = `
        UPDATE user_data SET email = $1, password = $2 WHERE userId = $3;
    `;

    let sql_personal = `
        UPDATE user_person SET firstName = $1, lastName = $2 WHERE userId = $3;
    `
    let sql_company = `
        UPDATE user_company SET name = $1, ceo = $2 WHERE userId = $3;
    `


    try{
        let result = await db.query(sql,[ req.body.email, req.body.password, req.body.userid]);
        let result_personal = await db.query(sql_personal, [req.body.firstname, req.body.lastname, req.body.userid]);
        let result_company = await db.query(sql_company, [req.body.name, req.body.ceo, req.body.userid]);

       res.send(result);
    }catch (e){
        console.log(e);
        res.send(null)
    }
    

});

router.delete("/byId/:id", async function (req, res) { 
    
    let sql = `DELETE FROM user_data WHERE userid=$1`;

    try{
        let result = await db.query(sql, [req.params.id]);

        res.send(result);
    }catch (e){
        console.log(e);
        res.send(null)
    }
    

});

module.exports = router;