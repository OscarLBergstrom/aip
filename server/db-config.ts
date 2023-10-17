const { createPool } = require('mysql2')

const pool = createPool({
    host: process.env.DB_HOST || "localhost",
    user: "root",
    password: "databasehaip",
    connectionLimit: 10
});

export default pool