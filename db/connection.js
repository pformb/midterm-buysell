// PG database client/connection setup
const { Pool } = require('pg');

const dbParams = {
  host: 'localhost',// process.env.DB_HOST,
  port: '5432', // process.env.DB_PORT,
  user: 'labber', // process.env.DB_USER,
  password: 'labber', // process.env.DB_PASS,
  database: 'midterm'// process.env.DB_NAME
};

const db = new Pool(dbParams);

db.connect();

module.exports = db;
