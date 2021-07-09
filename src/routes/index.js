const express = require("express");
const routes = express.Router();

const recipeController = require("../app/controllers/recipesController");
const SessionValidator = require("../app/middleware/session");

const admin = require(`./admin`);
const session = require(`./session`);

//Public view
routes.get("/", recipeController.index);
routes.get("/about", recipeController.about);
routes.get("/recipes", recipeController.recipes);
routes.get("/recipe/:id", recipeController.show);
routes.get("/recipes/chefs", recipeController.chefs);

// routes
routes.use("/admin", SessionValidator.onlyUsers, admin);
routes.use("/session", session);

module.exports = routes;
