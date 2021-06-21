const Recipe = require("../models/recipe");

module.exports = {
  async index(req, res) {
    try {
      const recipes = await Recipe.all(6);

      const images = recipes.map(async (recipe, index) => {
        recipes[index].images = await Recipe.images(recipe.id);
      });

      await Promise.all(images);

      for (let recipe of recipes) {
        recipe.images.map((image) => {
          image.src = `${req.protocol}://${
            req.headers.host
          }${image.path.replace("public", "")}`;
        });
      }
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
      const images = recipes.map(async (recipe, index) => {
        recipes[index].images = await Recipe.images(recipe.id);
      });

      await Promise.all(images);

      for (let recipe of recipes) {
        recipe.images.map((image) => {
          image.src = `${req.protocol}://${
            req.headers.host
          }${image.path.replace("public", "")}`;
        });
      }
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
      const recipe = await Recipe.find(req.params.id);

      recipe.images = await Recipe.images(recipe.id);

      recipe.images.map((image) => {
        image.src = `${req.protocol}://${req.headers.host}${image.path.replace(
          "public",
          ""
        )}`;
      });

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
