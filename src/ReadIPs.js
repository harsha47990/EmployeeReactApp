var sql = require("mssql");

// config for your database
var config = {
    user: 'it3testuser',
    password: 'Shell@123',
    server: 'jliq-sql012A,51001', 
    database: 'StoresCheckService' 
};

const pullTable = async () => {
    try {
        const pool = await sql.connect(config);
        const sqlQuery = 'SELECT * FROM Stores_IP_Tb';
        const result = await pool.request().query(sqlQuery);
        console.log(result);
        return result.recordset;
    } catch (err) {
        throw err;
    }
};


exports.pullTable = pullTable;