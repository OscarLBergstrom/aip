const { createPool } = require('mysql2')

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "databasehaip",
    database: "haip",
    connectionLimit: 10
});

export default pool