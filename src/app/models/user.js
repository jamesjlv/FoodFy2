const db = require("../../config/db");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const Base = require("./base");

Base.init({ table: "users" });

module.exports = {
  ...Base,
};
