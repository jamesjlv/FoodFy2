const Recipe = require("../models/recipe");
const File = require("../models/file");

module.exports = {
  async index(req, res) {
    try {
      const recipes = await Recipe.all();

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
      const images = await Recipe.images(req.params.id);

      let files = [];

      images.map((image) => {
        files.push({
          ...image,
          src: `${req.protocol}://${req.headers.host}${image.path.replace(
            "public",
            ""
          )}`,
        });
      });

      res.render("admin/recipes/show", { recipe, files });
    } catch (err) {
      console.log(err);
    }
  },
  async edit(req, res) {
    try {
      const recipe = await Recipe.find(req.params.id);
      const chefs = await Recipe.chefsAll();
      const images = await Recipe.images(req.params.id);

      let files = [];

      images.map((image) => {
        files.push({
          ...image,
          src: `${req.protocol}://${req.headers.host}${image.path.replace(
            "public",
            ""
          )}`,
        });
      });

      res.render("admin/recipes/edit", { recipe, chefs, files });
    } catch (err) {
      console.log(err);
    }
  },
  async post(req, res) {
    try {
      if (req.files.length == 0) {
        return res.send("Please, send at least 1 image");
      }

      const recipeId = await Recipe.create(req.body);

      const filesPromise = req.files.map((file) => {
        File.create({ ...file, recipeId });
      });

      await Promise.all(filesPromise);

      return res.redirect(`/admin/recipes/${recipeId}`);
    } catch (err) {
      console.log(err);
    }
  },
  async put(req, res) {
    try {
      const { id } = req.body;

      if (req.files.length != 0) {
        const newFilesPromise = req.files.map((file) => {
          File.create({ ...file, recipeId: req.body.id });
        });
        await Promise.all(newFilesPromise);
      }

      if (req.body.removed_files) {
        const removedFiles = req.body.removed_files.split(",");
        const lastIndex = removedFiles.length - 1;
        removedFiles.splice(lastIndex, 1);

        const removedFilesPromise = removedFiles.map((file) => {
          File.delete(file);
        });

        await Promise.all(removedFilesPromise);
      }

      const recipeId = await Recipe.update(req.body);
      return res.redirect(`/admin/recipes/${id}`);
    } catch (err) {
      console.log(err);
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.body;
      const images = await Recipe.images(id);

      const imagesPromise = images.map((image) => {
        File.delete(Number(image.id));
      });

      Promise.all(imagesPromise);

      await Recipe.delete(id);
      return res.redirect("/admin/recipes");
    } catch (err) {
      console.log(err);
    }
  },
};
