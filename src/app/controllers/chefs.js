const Chef = require("../models/chef");
const Recipe = require("../models/recipe");
const File = require("../models/file");

module.exports = {
  async index(req, res) {
    try {
      const chefs = await Chef.chefsAll();
      for (let chef of chefs) {
        if (chef.path) {
          chef.path = `${req.protocol}://${req.headers.host}${chef.path.replace(
            "public",
            ""
          )}`;
        }
      }
      return res.render("admin/chefs/index", { chefs });
    } catch (err) {
      console.log(err);
    }
  },
  async create(req, res) {
    try {
      return res.render("admin/chefs/create");
    } catch (err) {
      console.log(err);
    }
  },
  async show(req, res) {
    try {
      let chef = await Chef.find(req.params.id);
      const recipes = await Chef.chefRecipes(req.params.id);
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
      if (chef.path) {
        chef.path = `${req.protocol}://${req.headers.host}${chef.path.replace(
          "public",
          ""
        )}`;
      }
      return res.render("admin/chefs/show", { chef, recipes });
    } catch (err) {
      console.log(err);
    }
  },
  async edit(req, res) {
    try {
      const id = req.params.id;
      const chef = await Chef.find(id);
      res.render("admin/chefs/edit", { chef });
    } catch (err) {
      console.log(err);
    }
  },
  async post(req, res) {
    try {
      const fileId = await File.chefCreate({ ...req.files[0] });
      req.body.fileId = fileId;
      const chefId = await Chef.create(req.body);
      return res.redirect(`/admin/chefs/${chefId}`);
    } catch (err) {
      console.log(err);
    }
  },
  async put(req, res) {
    try {
      const { id } = req.body;
      if (req.files) {
        const fileId = await File.chefCreate({ ...req.files[0] });
        req.body.fileId = fileId;
      }
      const chefId = await Chef.update(req.body);
      return res.redirect(`/admin/chefs/${id}`);
    } catch (err) {
      console.log(err);
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.body;
      const chef = await Chef.find(id);
      await Chef.delete(id);
      if (chef.file_id) {
        await File.chefDelete(chef.file_id);
      }
      return res.redirect("/admin/chefs");
    } catch (err) {
      console.log(err);
    }
  },
};
