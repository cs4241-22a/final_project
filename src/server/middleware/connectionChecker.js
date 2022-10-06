const mongoose = require("mongoose");

module.exports = (req, res, next) => {
    if (mongoose.connection.readyState === 1) return next();
    else res.status(503).send();
}