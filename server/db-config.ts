const { createPool } = require('mysql2')

const pool = createPool({
    host: "db",
    user: "root",
    password: "databasehaip",
    database: "haip",
    connectionLimit: 10
});

export default pool