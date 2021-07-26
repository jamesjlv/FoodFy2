const User = require("../models/user");
const mailer = require("../../lib/mailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

module.exports = {
  async list(req, res) {
    try {
      const users = await User.findAll();

      let sucess = "";
      if (req.query.sucess) {
        sucess = req.query.sucess;
      }
      return res.render("admin/users/list", {
        users,
        isAdmin: req.session.isAdmin,
        sucess,
      });
    } catch (err) {
      console.log(err);
      return res.render("admin/users/list", {
        error: "Não foi possivel carregar os usuários",
        isAdmin: req.session.isAdmin,
      });
    }
  },
  create(req, res) {
    res.render("admin/users/create");
  },
  async post(req, res) {
    try {
      req.body.password = crypto.randomBytes(20).toString("hex");
      const passwordWihoutCrypt = req.body.password;
      req.body.password = bcrypt.hashSync(req.body.password, 8);

      const { name, password, email, is_admin } = req.body;

      const userId = await User.create({
        name,
        email,
        password,
        is_admin: is_admin || false,
      });

      await mailer.sendMail({
        from: '"FoodFy Receitas" <noreply@foodfy.com>',
        to: `${req.body.email}`,
        subject: "Seja bem vindo ao FoodFy",
        html: `
        <h1>Seja bem vindo ${req.body.name}</h1>
        <br/>
        <p>Abaixo seguem seus acessos a nossa plataforma foodfy</p>
        <b>Login:</b> ${req.body.email}<br/>
        <b>Senha:</b>  ${passwordWihoutCrypt}<br/>
        <p>Para acessar clique <a href='http://localhost:3000/session/login'>aqui</a></p>
        `,
      });

      return res.redirect(`/admin/users/${userId}/edit?sucess=ok`);
    } catch (err) {
      res.render("admin/users/create", {
        error: "Não foi possivel cadastrar o usuário",
        user: req.body,
      });
    }
  },
  async edit(req, res) {
    try {
      const user = await User.findOne(req.params.id);
      let sucess = "";
      if (req.query.sucess) {
        sucess = "Usuário criado com sucesso";
      }
      return res.render("admin/users/edit", {
        user,
        userId: req.session.userId,
        sucess,
      });
    } catch (err) {
      res.render("admin/users/edit", {
        error: "Não foi possivel encontrar o usuário",
      });
    }
  },
  async put(req, res) {
    try {
      if (req.body.is_admin) {
        req.body.is_admin = 1;
      } else {
        req.body.is_admin = 0;
      }

      const { name, email, is_admin } = req.body;

      await User.update(req.params.id, {
        name,
        email,
        is_admin: is_admin || false,
      });

      const user = {
        ...req.body,
        id: req.params.id,
      };

      return res.render("admin/users/edit", {
        user,
        userId: req.session.userId,
        sucess: "Usuário atualizado",
      });
    } catch (err) {
      res.render("admin/users/edit", {
        user: req.body,
        error: "Não foi possivel encontrar o usuário",
      });
    }
  },
  async delete(req, res) {
    try {
      await User.delete(req.params.id);
      return res.redirect("/admin/users?sucess=Usuário deletado com sucesso");
    } catch (err) {
      console.log(err);
      return res.render(`admin/users/edit`, {
        user: req.body,
        error: "Não foi possivel excluir o usuário",
      });
    }
  },
};
