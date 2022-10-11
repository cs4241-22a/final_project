"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Cell = new mongoose.Schema({
    emoji: { type: String, required: true },
    timeStamp: { type: Date, required: true },
    user: { type: mongoose.Types.ObjectId, "default": undefined }
});
exports["default"] = mongoose.model('Cells', Cell, 'cells');
