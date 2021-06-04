const Recipe = require("../models/recipe");

module.exports = {
  async index(req, res) {
    try {
      const recipes = await Recipe.all(6);
      return res.render("recipes/index", { recipes });
    } catch (err) {
      console.log(err);
    }
  },
  about(req, res) {
    return res.render("recipes/about");
  },
  async recipes(req, res) {
    try {
      const recipes = await Recipe.all(false, req.query.filter);
      return res.render("recipes/recipes", {
        recipes,
        filter: req.query.filter,
      });
    } catch (err) {
      console.log(err);
    }
  },
  async show(req, res) {
    try {
      console.log(req.params.id);
      const recipe = await Recipe.find(req.params.id);
      return res.render("recipes/recipe-details", { recipe });
    } catch (err) {
      console.log(err);
    }
  },
  async chefs(req, res) {
    try {
      const chefs = await Recipe.chefsAll();

      return res.render("recipes/chefs", { chefs });
    } catch (err) {
      console.log(err);
    }
  },
};
