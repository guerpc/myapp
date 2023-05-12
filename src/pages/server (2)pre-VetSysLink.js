const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
//node server.js //this is how you start run from cur dir of file, need so it can fetch sql qur
app.use(cors());
app.use(express.json());

const config = {
    user: 'admin',
    password: 'PhilPass22',
    server: 'testdb01.ctvzqw0ox2or.us-east-2.rds.amazonaws.com',
    port: 1433,
    database: 'testDB1',
    options: {
        encrypt: false,
        enableArithAbort: true
    }
};

app.get('/users', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT * from Users');
        res.send(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
