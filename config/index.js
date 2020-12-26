const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_HOSP: process.env.DB_HOSP,
    DB_DIALECT: process.env.DB_DIALECT,
    DB_PORT: process.env.DB_PORT
}