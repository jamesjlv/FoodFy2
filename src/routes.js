const express = require("express");
const routes = express.Router();

const multer = require("./app/middleware/multer");

const recipeController = require("./app/controllers/recipes");
const adminController = require("./app/controllers/admin");
const chefsController = require("./app/controllers/chefs");

//Public view
routes.get("/", recipeController.index);
routes.get("/about", recipeController.about);
routes.get("/recipes", recipeController.recipes);
routes.get("/recipe/:id", recipeController.show);
routes.get("/recipes/chefs", recipeController.chefs);

//Admin - Recipes
routes.get("/admin/recipes", adminController.index);
routes.get("/admin/recipes/create", adminController.create);
routes.get("/admin/recipes/:id", adminController.show);
routes.get("/admin/recipes/:id/edit", adminController.edit);
routes.post("/admin/recipes", multer.array("photos", 5), adminController.post);
routes.put("/admin/recipes", multer.array("photos", 5), adminController.put);
routes.delete("/admin/recipes", adminController.delete);

//Admin - Chefs
routes.get("/admin/chefs", chefsController.index);
routes.get("/admin/chefs/create", chefsController.create);
routes.get("/admin/chefs/:id", chefsController.show);
routes.get("/admin/chefs/:id/edit", chefsController.edit);
routes.post("/admin/chefs", multer.array("photos", 1), chefsController.post);
routes.put("/admin/chefs", multer.array("photos", 1), chefsController.put);
routes.delete("/admin/chefs", chefsController.delete);

module.exports = routes;
