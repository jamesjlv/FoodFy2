const Recipe = require("../models/recipe");

module.exports = {
  async index(req, res) {
    try {
      const recipes = await Recipe.all();
      return res.render("admin/recipes/index", { recipes });
    } catch (err) {
      console.log(err);
    }
  },
  async create(req, res) {
    try {
      const chefs = await Recipe.chefsAll();
      return res.render("admin/recipes/create", { chefs });
    } catch (err) {
      console.log(err);
    }
  },
  async show(req, res) {
    try {
      const recipe = await Recipe.find(req.params.id);

      res.render("admin/recipes/show", { recipe });
    } catch (err) {
      console.log(err);
    }
  },
  async edit(req, res) {
    try {
      const recipe = await Recipe.find(req.params.id);
      const chefs = await Recipe.chefsAll();
      res.render("admin/recipes/edit", { recipe, chefs });
    } catch (err) {
      console.log(err);
    }
  },
  async post(req, res) {
    try {
      const recipeId = await Recipe.create(req.body);
      return res.redirect(`/admin/recipes/${recipeId}`);
    } catch (err) {
      console.log(err);
    }
  },
  async put(req, res) {
    try {
      const { id } = req.body;
      const recipeId = await Recipe.update(req.body);
      return res.redirect(`/admin/recipes/${id}`);
    } catch (err) {
      console.log(err);
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.body;
      await Recipe.delete(id);
      return res.redirect("/admin/recipes");
    } catch (err) {
      console.log(err);
    }
  },
};
