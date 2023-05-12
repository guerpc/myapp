const express = require('express');
const sql = require('mssql');
const cors = require('cors');


const expApp = express();
//node server.js //this is how you start run from cur dir of file, need so it can fetch sql qur
expApp.use(cors());
expApp.use(express.json());

const config = {
    user: 'Arthur',
    password: '123',
    server: 'database-1.ci7iawyx7c5x.us-east-1.rds.amazonaws.com',
    port: 1433,
    database: 'VetAppointmentSystem',
    options: {
        encrypt: false,
        enableArithAbort: true
    }
};

expApp.get('/VetLoginInfo', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT * from VetLoginInfo');
        res.send(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

expApp.get('/VetAccountInfo', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT * from VetAccountInfo');
        res.send(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});


expApp.get('/VetScheduleInfo', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT * from VetScheduleInfo');
        res.send(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

expApp.get('/AppointmentInfo', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT * from AppointmentInfo');
        res.send(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});


expApp.get('/CancellationInfo', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT * from CancellationInfo');
        res.send(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

expApp.get('/PetInfo', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT * from PetInfo');
        res.send(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});
//empty table presently
expApp.get('/PetRecords', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT * from PetRecords');
        res.send(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

expApp.get('/CancellationInfo', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT * from CancellationInfo');
        res.send(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});


expApp.get('/UserAccountInfo', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT * from UserAccountInfo');
        res.send(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

expApp.get('/UserLogininfo', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT * from UserLogininfo');
        res.send(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});


module.exports = {
    expApp,
    sql,
    cors
};
