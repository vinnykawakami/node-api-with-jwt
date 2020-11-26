require('dotenv').config();
const bcrypt = require('bcryptjs');
const dbClient = require('../../config/dbMySQL');
const utils = require('../../helpers/utils');;
const { ErrorHandler } = require('../../helpers/customErrors');
const privateKey = process.env.JWT_SECRET;

class RegisterController {
    showRegisterForm(req, res, next) {
        res.status(200).json({ message: 'show register form' });
    }
    register(req, res, next) {
        res.status(201).json({ message: 'register' });
    }
}

module.exports = new RegisterController();

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