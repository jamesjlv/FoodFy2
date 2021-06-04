const { Pool } = require("pg");

module.exports = new Pool({
  user: "postgres",
  password: "barc$9elona11",
  host: "localhost",
  port: 5432,
  database: "foodfy",
});
