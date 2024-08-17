const { Pool } = require("pg");

let db = new Pool({
    connectionString: process.env.dbConnectionString
});

/* -------------------------------- Messages -------------------------------- */

async function getAllMessages(){
    const { rows } = await db.query("SELECT * FROM messages")
    return rows;
}

async function createMessage(title, content){
    await db.query("INSERT INTO messages (title, content) VALUES ($1, $2)", [title, content]);
}

/* ---------------------------------- User ---------------------------------- */

async function getUserFromUsername(username){
    const { rows } = await db.query("SELECT * FROM users WHERE username=$1", [username])
    return rows;
}

async function getUserWhere(userId){
    const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [userId]);
    return rows;
}

async function createUser(fName, lName, username, password, premium){
    await db.query("INSERT INTO users (first_name, last_name, username, password_digest, membership_status) VALUES ($1,$2,$3,$4,$5)", [fName, lName, username, password, premium ? 1 : 0]);
}

/* ------------------------------------ - ----------------------------------- */

module.exports = {
    getAllMessages,
    createMessage,
    createUser,
    getUserFromUsername,
    getUserWhere
}