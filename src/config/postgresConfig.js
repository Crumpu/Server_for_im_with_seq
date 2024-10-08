require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.HOST_NAME,
    dialect: "postgres",
    migrationStorage: "json",
    seederStorage: "json",
  },
  test: {},
  production: {},
};
