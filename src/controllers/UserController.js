require('dotenv').config();
const dbClient = require('../config/dbMySQL');
const utils = require('../helpers/utils');;
const { ErrorHandler } = require('../helpers/customErrors');

class UserController {
    getAllUsers(req, res, next) {
        dbClient.getConnection((err, conn) => {
            if (err) {
                throw new ErrorHandler(
                    500,
                    'An error occurred during your database connection',
                    { err }
                );
            }

            console.log('connected as id ' + conn.threadId);

            conn.query('select * from users', (err, rows, fields) => {
                if (!err) {
                    res.status(200).json({
                        users: rows
                    });
                } else {
                    throw new ErrorHandler(
                        500,
                        'There was an error with your database query',
                        { err }
                    );
                }
            });
        });
    }
}

module.exports = new UserController();