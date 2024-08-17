const { Pool } = require("pg");

let db = new Pool({
    connectionString: process.env.dbConnectionString
});

/* ------------------------------------ - ----------------------------------- */

async function getAllMessages(){
    const { rows } = await db.query("SELECT * FROM messages")
    return rows;
}

/* ------------------------------------ - ----------------------------------- */

module.exports = {
    getAllMessages
}