const express = require("express");
const routes = express.Router();
const SessionController = require("../app/controllers/sessionController");
const SessionValidator = require("../app/validators/session");

routes.get("/login", SessionController.loginForm);
routes.post("/login", SessionValidator.login, SessionController.login);
routes.get("/logout", SessionController.logout);
routes.get("/forgot-password", SessionController.forgotPassword);
routes.post("/forgot-password", SessionController.forgot);
routes.get(
  "/reset-password",
  SessionValidator.resetPassword,
  SessionController.resetPassword
);
routes.post("/reset-password", SessionValidator.reset, SessionController.reset);

module.exports = routes;
