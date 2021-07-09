const User = require("../models/user");

module.exports = {
  async index(req, res) {
    try {
      const id = req.session.userId;
      const user = await User.find({ where: { id } });

      return res.render("admin/profile/index", { user });
    } catch (err) {
      console.log(err);
      return res.redirect("/admin/profile/index");
    }
  },
  async put(req, res) {
    try {
      await User.update(req.body.id, req.body);

      return res.redirect(`/admin/profile`);
    } catch (err) {
      console.log(err);
      return res.render("admin/profile/index", {
        user: req.body,
        error: "Erro ao atualizar o usuário",
      });
    }
  },
};
