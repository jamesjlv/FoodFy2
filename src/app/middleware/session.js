module.exports = {
  onlyUsers(req, res, next) {
    if (!req.session.userId) return res.redirect("/session/login");
    next();
  },
  isLoggedRedirectToUsers(req, res, next) {
    if (req.session.userId) return res.redirect("/admin/profile");

    next();
  },
  onlyAdmin(req, res, next) {
    if (req.session.isAdmin == false) return res.redirect("/admin/profile");
    next();
  },
};
