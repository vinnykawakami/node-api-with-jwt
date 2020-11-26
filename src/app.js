// required modules/files
require('dotenv-safe').config();
// imported modules
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const app = express();
const { ErrorHandler } = require('./helpers/customErrors');
const privateKey = process.env.JWT_SECRET;

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

function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send({ auth: false, message: 'Token not provided.' });

    jwt.verify(token, privateKey, (err, user) => {
        console.log(err)
        if (err) return res.status(403).send({ auth: false, message: 'Invalid token!' });
        req.user = user
        next() // pass the execution off to whatever request the client intended
    })
}

// Routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', authenticateToken, userRouter);

// Response if not find any route
app.use((req, res, next) => {
    const error = new Error('GOMU GOMU NO... NOT FOUND!');
    error.status = 'error';
    error.statusCode = 404;
    error.data = {};
    next(error);
});

// default custom ErrorHandler
app.use((error, req, res, next) => {
    throw new ErrorHandler(
        error.status,
        error.statusCode || 500, 
        error.message, 
        error.data);
});

module.exports = app;
