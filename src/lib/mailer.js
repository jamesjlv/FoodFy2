const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "69890e0ad7987b",
    pass: "b1ef262157c8e5",
  },
});
