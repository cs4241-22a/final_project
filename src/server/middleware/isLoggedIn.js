const allowed = ["/robots.txt", "/login", "/auth/github", "/auth/github/callback"]

module.exports = (req, res, next) => {
    if (allowed.includes(req.path) || req.isAuthenticated() || req.path.includes("/assets/")) return next();
    else res.redirect("/login");
}