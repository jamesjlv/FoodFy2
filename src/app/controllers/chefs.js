const Chef = require("../models/chef");

module.exports = {
  async index(req, res) {
    try {
      const chefs = await Chef.chefsAll();
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
      const chef = await Chef.find(req.params.id);
      const recipes = await Chef.chefRecipes(req.params.id);

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
      const chefId = await Chef.create(req.body);
      return res.redirect(`/admin/chefs/${chefId}`);
    } catch (err) {
      console.log(err);
    }
  },
  async put(req, res) {
    try {
      const { id } = req.body;
      const chefId = await Chef.update(req.body);
      return res.redirect(`/admin/chefs/${id}`);
    } catch (err) {
      console.log(err);
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.body;
      await Chef.delete(id);
      return res.redirect("/admin/chefs");
    } catch (err) {
      console.log(err);
    }
  },
};
