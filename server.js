// required modules/files
require('dotenv-safe').config();

// main app
const app = require('./src/app');

// import packages/modules/files
const http = require('http');
const https = require('https');
const fs = require('fs');

// functions
function normalizePort(value) {
    const port = parseInt(value, 10);
    if (isNaN(port)) {
        return value;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

// server ports and options
const PORT = normalizePort(process.env.APP_PORT || 3000);
const serverOptions = {
    key: fs.readFileSync(process.env.SRV_SSL_KEY),
    cert: fs.readFileSync(process.env.SRV_SSL_CERT)
}
// Listen both http & https ports
const httpServer = http.createServer(app);
const httpsServer = https.createServer(serverOptions, app);

httpServer.listen(PORT, () => {
    console.log(`HTTP Server listening on port ${PORT}`);
});
httpsServer.listen(443, () => {
    console.log('HTTPS Server listening on port 443');
});
