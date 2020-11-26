class ErrorHandler extends Error {
    constructor(status, statusCode, message, data) {
        super();
        this.status = status,
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

const handleError = (err, res) => {
    const { status, statusCode, message, data } = err;
    res.status(statusCode).json({
        status,
        statusCode,
        message,
        data
    });
};

module.exports = {
    ErrorHandler,
    handleError
}