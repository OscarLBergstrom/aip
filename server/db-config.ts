const { createPool } = require('mysql2')

const pool = createPool({
    host: "db-service", //set to "db" if using docker-compose, and "localhost" if running locally
    user: "root",
    password: "databasehaip",
    connectionLimit: 10
});

export default pool