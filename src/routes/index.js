const express = require('express');
const router = express.Router();
const dbConn = require('../config/dbMySQL');

var pjson = require('../../package.json');
var today = new Date();

router.get('/', (req, res, next) => {
    res.status(200).json(
        {
            API: pjson.description,
            Version: pjson.version,
            Status: `online at ${today}`
        }
    );
});

module.exports = router;