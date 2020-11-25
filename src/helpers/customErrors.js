class ErrorHandler extends Error {
    constructor(statusCode, message, data) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

const handleError = (err, res) => {
    const { status, statusCode, message, data } = err;
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
        data
    });
};

module.exports = {
    ErrorHandler,
    handleError
}