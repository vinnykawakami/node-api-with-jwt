require('dotenv').config({
	path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const fs = require('fs');
const http = require('http');
const https = require('https');
const app = require('./app');
const PORT = normalizePort(process.env.PORT || process.env.APP_PORT || 3000);

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

const serverOptions = {
	key: fs.readFileSync(process.env.SRV_SSL_KEY),
	cert: fs.readFileSync(process.env.SRV_SSL_CERT)
}
// Listen both http & https ports
const httpServer = http.createServer(app);
const httpsServer = https.createServer(serverOptions, app);

if (require.main === module) {
	httpServer.listen(PORT, () => {
		console.log(`HTTP Server listening on port ${PORT}...`);
	});
	httpsServer.listen(443, () => {
		console.log('HTTPS Server listening on port 443...');
	});
}