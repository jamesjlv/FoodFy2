const User = require("../models/user");
const { compare } = require("bcryptjs");

module.exports = {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.find({ where: { email } });

      if (!user) {
        return res.render("admin/session/login", {
          user: req.body,
          error: "Usuário não cadastrado!",
        });
      }

      const passed = await compare(password, user.password);

      if (!passed) {
        return res.render("admin/session/login", {
          user: req.body,
          error: "Senha incorreta!",
        });
      }

      req.user = user;
      next();
    } catch (err) {
      console.log(err);
    }
  },
  async resetPassword(req, res, next) {
    try {
      if (!req.query.token) {
        if (!req.body.token) {
          return res.redirect("/session/login");
        }
      }

      const user = await User.find({
        where: { reset_token: req.query.token || req.body.token },
      });

      if (!user) {
        return res.render("admin/session/forgot-password", {
          error: "Token Inválido, solicite novamente outra recuperação",
        });
      }

      let now = new Date();
      let passed = false;

      if (user.reset_token_expires > now.setHours(now.getHours())) {
        passed = true;
      } else {
        return res.render("admin/session/forgot-password", {
          error: "Token Inválido, solicite novamente outra recuperação",
        });
      }

      req.user = user;

      next();
    } catch (err) {
      console.log(err);
    }
  },
  async reset(req, res, next) {
    try {
      if (!req.body.token) {
        return res.render("admin/session/forgot-password", {
          error: "Não foi encontrado o token, solicite uma nova recuperação",
          user: req.body,
          token: req.query.token,
        });
      }

      const user = await User.find({
        where: { email: req.body.email },
        and: { reset_token: req.body.token },
      });

      if (!user) {
        return res.render("admin/session/reset-password", {
          error:
            "Não encontramos o usuário, verifique se seu e-mail está correto",
          user: req.body,
          token: req.query.token,
        });
      }

      req.user = user;
      next();
    } catch (err) {
      console.log(err);
    }
  },
};
