const {Pool} = require("pg");


//LOCAL DB

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "processManager",
    password: "bazepodataka",
    port: 5432
}); 


//DEPLOYED DB

/* const pool = new Pool({
    user: "projektadmin",
    host: "161.53.18.24",
    database: "BLogistics",
    password: "5tz89rg5489ohizg",
    port: 5432
});
 */


/*
Baza: BLogistics
Server: 161.53.18.24
User: projektadmin
Password: 5tz89rg5489ohizg
*/
module.exports = {
    query: (text, params) => {
        const start = Date.now();
        return pool.query(text, params)
            .then(res => {
                const duration = Date.now() - start;
                return res;
            });
    },
    pool: pool
}

