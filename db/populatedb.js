require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR (255),
    last_name VARCHAR (255),
    username VARCHAR (255),
    password_digest VARCHAR (255),
    membership_status INT,
    admin_status INT
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    author_id INT,
    title VARCHAR (255),
    content VARCHAR (255),
    membership_req INT
);

INSERT INTO messages (author_id, title, content, membership_req) 
VALUES
    (1, 'I love cats!', 'idk why they are just so awesome', 0),
    (2, 'You cant see this!', 'Haha you need an extra level of membership to see this. If you do, youre very special', 1)
;

INSERT INTO users (first_name, last_name, username, password_digest, membership_status, admin_status)
VALUES
  ('q', 'q', 'q', '$2a$10$gTpd5UPrKWHPwWjHidvB4OpX404fCh5T9Om1QNwx7ZH684sXpgdfq', 0, 0),
  ('w', 'w', 'w', '$2a$10$exsrpyADOszpVuNmq1opjuGU0A21FZzkTJN.GcYoDpBtJN/AxfCAG', 1, 0),
  ('Boss', 'Man', 'Admin', '$2a$10$MmlvtXOwYORtSXTW77/XZe6w/VgE.BLGmGRkIZUuojeJaoPxgp.VS', 1, 1)
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

// Connection string example:
// postgresql://<role_name>:<role_password>@<host>:<port>/<db_name>

main();
