const mssql = require('mssql')
const dotenv = require('dotenv');
dotenv.config();

const sqlConfig = {
    user: process.env.MS_USER,
    password: process.env.MS_PASSWORD,
    database: process.env.MS_DATABASE,
    server: process.env.MS_SERVER,

    // user: "SA",
    // password: "DBasala_Password",
    // database: "ProfessionalsWebDB",
    // server: "localhost",
    port: 1433, //Port to connect to (default: 1433). Don't set when connecting to named instance.
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure use true
        trustServerCertificate: true // use true for local dev / self-signed certs
    }
}
const appPool = new mssql.ConnectionPool(sqlConfig);
appPool.connect()
    .then(pool => {
        console.log('Connected to MSSQL');
        return pool;
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports.appPool = appPool;
