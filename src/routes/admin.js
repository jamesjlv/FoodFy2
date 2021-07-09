const express = require("express");
const routes = express.Router();

const multer = require("../app/middleware/multer");

const adminController = require("../app/controllers/adminController");
const chefsController = require("../app/controllers/chefsController");
const UserController = require("../app/controllers/userController");
const ProfileController = require("../app/controllers/profileController");

const SessionValidator = require("../app/middleware/session");

//Admin - Recipes
routes.get("/recipes", adminController.index);
routes.get("/recipes/create", adminController.create);
routes.get("/recipes/:id", adminController.show);
routes.get("/recipes/:id/edit", adminController.edit);
routes.post("/recipes", multer.array("photos", 5), adminController.post);
routes.put("/recipes", multer.array("photos", 5), adminController.put);
routes.delete("/recipes", adminController.delete);

// - Chefs
routes.get("/chefs", chefsController.index);
routes.get("/chefs/create", SessionValidator.onlyAdmin, chefsController.create);
routes.get("/chefs/:id", chefsController.show);
routes.get("/chefs/:id/edit", SessionValidator.onlyAdmin, chefsController.edit);
routes.post(
  "/chefs",
  SessionValidator.onlyAdmin,
  multer.array("photos", 1),
  chefsController.post
);
routes.put(
  "/chefs",
  SessionValidator.onlyAdmin,
  multer.array("photos", 1),
  chefsController.put
);
routes.delete("/chefs", SessionValidator.onlyAdmin, chefsController.delete);

// // Rotas de perfil de um usuário logado
routes.get("/profile", SessionValidator.onlyUsers, ProfileController.index); // Mostrar o formulário com dados do usuário logado
routes.put("/profile", SessionValidator.onlyUsers, ProfileController.put); // Editar o usuário logado

// // Rotas que o administrador irá acessar para gerenciar usuários
routes.get("/users", SessionValidator.onlyAdmin, UserController.list); // Mostrar a lista de usuários cadastrados
routes.post("/users", SessionValidator.onlyAdmin, UserController.post); // Cadastrar um usuário
routes.get("/users/create", SessionValidator.onlyAdmin, UserController.create); // Mostrar o formulário de criação de um usuário
routes.put("/users/:id", SessionValidator.onlyAdmin, UserController.put); // Editar um usuário
routes.get("/users/:id/edit", SessionValidator.onlyAdmin, UserController.edit); // Mostrar o formulário de edição de um usuário
routes.delete("/users/:id", SessionValidator.onlyAdmin, UserController.delete); // Deletar um usuário

module.exports = routes;
