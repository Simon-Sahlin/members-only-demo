const { Pool } = require("pg");

let db = new Pool({
    connectionString: process.env.dbConnectionString
});

/* ------------------------------------ - ----------------------------------- */

async function getAllUsers(){
    const { rows } = await db.query("SELECT * FROM users")
}

/* ------------------------------------ - ----------------------------------- */

module.exports = {
    getAllUsers
}