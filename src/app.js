// required modules/files
require('dotenv-safe').config();

// imported modules
const express = require('express');
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.use('/', (req, res) => {
    res.status(200).json({
        message: 'Ola mundo!'
    })
})

module.exports = app;
