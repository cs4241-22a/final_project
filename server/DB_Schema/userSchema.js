"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var User = new mongoose.Schema({
    username: { type: String, required: true },
    timeOfLastEdit: { type: Date, required: true, "default": Date.now() }
});
exports["default"] = mongoose.model('Users', User, 'users');
