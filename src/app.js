// required modules/files
require('dotenv-safe').config();
// imported modules
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const { ErrorHandler } = require('./helpers/customErrors');

// middlewares
app.use(cors());
app.use(morgan('combined'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// setup CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).send({});
    }
    next();
});

// set up a route to redirect http to https
app.use(function (req, res, next) {
    if (req.secure) {
        // request was via https, so do no special handling
        next();
    } else {
        // request was via http, so redirect to https
        // res.redirect('https://' + req.headers.host + req.url);
        res.status(403).send({
            warning: "Pay attention please!",
            message: "This protocol isn't able to serve any request. Please, use HTTPS protocol in your requests."
        }).end();
    }
});

app.use('/dd', (req, res) => {
    res.status(200).json({message: 'Ok google'});
})

// Response if not find any route
app.use((req, res, next) => {
    const error = new Error('Akuma no Mi...Not Found! XD');
    error.statusCode = 404;
    error.data = {};
    next(error);
});

// default custom ErrorHandler
app.use((error, req, res, next) => {
    throw new ErrorHandler(
        error.statusCode || 500, 
        error.message, 
        error.data);
});

module.exports = app;
