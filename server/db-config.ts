const { createPool } = require('mysql2')

const pool = createPool({
    host: "db",
    user: "root",
    password: "databasehaip",
    connectionLimit: 10
});

export default pool