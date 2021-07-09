const crypto = require("crypto");
const User = require("../models/user");
const mailer = require("../../lib/mailer");

module.exports = {
  async loginForm(req, res) {
    try {
      return res.render("admin/session/login");
    } catch (err) {
      console.log(err);
    }
  },
  async login(req, res) {
    try {
      req.session.userId = req.user.id;
      if (req.user.is_admin == true) {
        req.session.isAdmin = true;
      } else {
        req.session.isAdmin = false;
      }
      return res.redirect("/admin/profile");
    } catch (err) {
      console.log(err);
      return res.render("admin/session/login", {
        user: req.body,
        error: "Erro, tente novamente mais tarde",
      });
    }
  },
  async logout(req, res) {
    try {
      req.session.destroy();
      return res.redirect("/session/login");
    } catch (err) {
      console.log(err);
      return res.redirect("/session/login");
    }
  },
  async forgotPassword(req, res) {
    try {
      res.render("admin/session/forgot-password");
    } catch (err) {
      console.log(err);
      return res.redirect("/session/login");
    }
  },
  async forgot(req, res) {
    try {
      const reset_token = crypto.randomBytes(20).toString("hex");
      let now = new Date();
      now = now.setHours(now.getHours() + 1);
      const { email } = req.body;
      const userFound = await User.find({
        where: { email },
      });

      if (!userFound) {
        return res.render("admin/session/forgot-password", {
          error: "Usuário não cadastrado",
          user: req.body,
        });
      }

      await User.update(userFound.id, {
        reset_token,
        reset_token_expires: now,
      });

      await mailer.sendMail({
        to: req.body.email,
        from: "no-reply@foodfy.com",
        subject: "Recuperação de Senha",
        html: `
      <h2>Perdeu a chave?</h2>
      <p>Não se preocupe, clique no link abaixo para recuperar sua senha </p>
      <p>
        <a href="http://localhost:3000/session/reset-password?token=${reset_token}" target="_blank">
        Recuperar Senha
        </a>
      </p>

      `,
      });

      return res.render("admin/session/forgot-password", {
        sucess: "Verifique seu e-mail para resetar sua senha",
        user: req.body,
      });
    } catch (err) {
      console.log(err);
      return res.render("admin/session/forgot-password", {
        error: "Não foi possivel recuperar sua senha",
        user: req.body,
      });
    }
  },
  async resetPassword(req, res) {
    try {
      return res.render("admin/session/reset-password", {
        token: req.query.token,
      });
    } catch (err) {
      console.log(err);
      res.render("admin/session/reset-password", {
        error: "Erro, tente novamente",
        user: req.body,
      });
    }
  },
  async reset(req, res) {
    try {
      let user = req.user;

      await User.update(user.id, {
        password: req.body.password,
        reset_token: "",
        reset_token_expires: "",
      });

      return res.render("admin/session/login", {
        sucess: "Senha resetada com sucesso",
      });
    } catch (err) {
      console.log(err);
      return res.render("admin/session/reset-password", {
        error: "Não foi possivel trocar a senha",
        user: req.body,
        token: req.query.token,
      });
    }
  },
};
