require('dotenv').config();
const bcrypt = require('bcryptjs');
const dbClient = require('../../config/dbMySQL');
const utils = require('../../helpers/utils');;
const { ErrorHandler } = require('../../helpers/customErrors');
const { connect } = require('../../config/dbMySQL');
const privateKey = process.env.JWT_SECRET;

class AuthController {
    showLoginForm(req, res, next) {
        res.status(200).json({ message: 'show login form' });
    }
    login(req, res, next) {
        dbClient.getConnection((err, conn) => {
            if (err) {
                throw new ErrorHandler(
                    "error",
                    500,
                    "An error occurred during your database connection",
                    { err }
                );
            }
            conn.query(
                'SELECT * FROM users WHERE email = ?',
                [req.body.login],
                (err, rows, fields) => {
                    conn.release();
                    if (!err) {
                        if (rows.length > 0) {
                            if (utils.isPasswordMatch(req.body.password, rows[0].password) === true) {
                                res.status(200).json({
                                    status: "success",
                                    statusCode: 200,
                                    message: "Login successfully",
                                    user: rows
                                });
                            } else {
                                res.status(403).json({
                                    status: "error",
                                    statusCode: 403,
                                    message: "Invalid credentials! Try again...",
                                    data: {
                                        login: req.body.login,
                                        password: req.body.password
                                    }
                                });
                            }
                        } else {
                            res.status(200).json({
                                status: "success",
                                statusCode: 200,
                                message: "User not found",
                                user: {}
                            });
                        }
                    } else {
                        throw new ErrorHandler(
                            "error",
                            500,
                            "There was an error with your database query",
                            { err }
                        );
                    }
                }
            );
        });
        // res.status(200).json({ message: 'login user' });
    }
    logout(req, res, next) {
        res.status(200).json({ message: 'logout' });
    }
}

module.exports = new AuthController();

// router.get('/', (req, res, next) => {
//     dbConn.getConnection((err, conn) => {
//         if (err) {
//             throw new ErrorHandler(
//                 500,
//                 'An error occurred during your database connection',
//                 { err }
//             );
//         }

//         console.log('connected as id ' + conn.threadId);

//         conn.query('select * from users where id = ?', [req.body.id], (err, rows, fields) => {
//             if (!err) {
//                 res.status(200).json({
//                     users: rows
//                 });
//             } else {
//                 throw new ErrorHandler(
//                     500,
//                     'There was an error with your database query',
//                     { err }
//                 );
//             }
//         });
//     });
// });