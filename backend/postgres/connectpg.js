const Pool = require('pg').Pool

const user = process.env.PGUSER
const password = process.env.PGPASSWORD
const host = process.env.PGHOST
const port = process.env.PGPORT
const database = process.env.PGDATABASE

const pool = new Pool({
    user: user,
    password: password,
    host: host,
    database: database,
    port: port
})

module.exports = (
    pool
)