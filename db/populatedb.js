require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255), 
);

INSERT INTO users (username) 
VALUES 
    ('Simon'),
    ('Selma'),
    ('Dory')
;
`;

async function main() {
  console.log("Seeding database...");
  const client = new Client({
    connectionString: process.env.dbConnectionString,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done");
}

main();
