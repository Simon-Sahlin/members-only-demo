const { Pool } = require("pg");

let db = new Pool({
    connectionString: process.env.dbConnectionString
});

/* -------------------------------- Messages -------------------------------- */

async function getAllMessages(){
    const { rows } = await db.query("SELECT * FROM messages")
    return rows;
}

async function getAllMessagesWithAuthors(){
    const { rows } = await db.query("SELECT a.*, b.username FROM messages a JOIN users b ON a.author_id = b.id");
    return rows;
}

async function createMessage(userId, title, content, premium){
    await db.query("INSERT INTO messages (author_id, title, content, membership_req) VALUES ($1, $2, $3, $4)", [userId, title, content, premium ? 1 : 0]);
}

async function deleteMessage(id){
    await db.query("DELETE FROM messages WHERE id=$1", [id]);
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
    await db.query("INSERT INTO users (first_name, last_name, username, password_digest, membership_status, admin_status) VALUES ($1,$2,$3,$4,$5,$6)", [fName, lName, username, password, premium ? 1 : 0, 0]);
}

/* ------------------------------------ - ----------------------------------- */

module.exports = {
    getAllMessages,
    getAllMessagesWithAuthors,
    createMessage,
    createUser,
    getUserFromUsername,
    getUserWhere,
    deleteMessage
}