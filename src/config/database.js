require('dotenv').config({
	path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const fs = require('fs');

module.exports = {
	host: process.env.DB_HOST,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	port: process.env.DB_PORT,
	dialect: process.env.DB_DIALECT || "mysql",
	storage: './__tests__/database.sqlite',
	ssl: true,
	dialectOptions: {
		charset: 'utf8mb4_unicode_ci',
		ssl: {
			ca: fs.readFileSync(__dirname + process.env.DB_SSL_CA),
			cert: fs.readFileSync(__dirname + process.env.DB_SSL_CERT),
			key: fs.readFileSync(__dirname + process.env.DB_SSL_KEY)
		}
	},
	pool: {
		max: 10,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	operatorsAliases: 0,
	logging: false,
	define: {
		timestamps: true,
		underscored: true,
		underscoredAll: true,
	}
};