'use strict';

require('dotenv/config');

const fs = require('fs');
const mysql = require('mysql2');

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4_unicode_ci',
    ssl: {
        ca: fs.readFileSync(__dirname + '/ssl/certs/MySQLRootCA.pem'),
        cert: fs.readFileSync(__dirname + '/ssl/certs/MySQLClient.crt'),
        key: fs.readFileSync(__dirname + '/ssl/private/MySQLClient.key')
    }
});

connection.getConnection((err, connection) => {
    if (!err) {
        console.log('MySQL Connection Established Successfully ('+connection.threadId+')');
        connection.release();
    } else {
        console.log('MySQL Connection Failed!' + JSON.stringify(err, undefined, 2));
    }
});

module.exports = connection;