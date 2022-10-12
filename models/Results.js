const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ResultsSchema = new Schema(
    {
        owner_id: {type: String, required: true},
        game_type: {type: String, required: true, enum: ["cps", "accuracy", "reaction"]},
        score: { 
            type: Number, 
            required: [true, "A score is required!"]},
        time: {type: Date, default: new Date()}
    },
    { timestamps: true }
);

ResultsSchema.index({ game_type: 1, score: 1 });

ResultsSchema.statics.findOrCreate = require("find-or-create");

ResultsSchema.statics.getAllResultsForGame = function(game) {
    return this.find({game_type: game})
}

ResultsSchema.statics.getTopResultsForGame = function(game_type, n_scores) {
    return this.find({game_type: game_type}).sort({score: "desc"}).limit(n_scores)
}

ResultsSchema.statics.getTopResultsForTimeGame = function(game_type, n_scores) {
    return this.find({game_type: game_type}).sort({score: "asc"}).limit(n_scores)
}

ResultsSchema.statics.getResultsForUserId = function(user_id) {
    return this.find({owner_id: user_id})
}

ResultsSchema.statics.getRankforScore = function(game, score) {
    var numGreaterThan = this.distinct({game_type: game, score: { $gt: score}}).count();
    return null;
}

module.exports = mongoose.model("results", ResultsSchema, "results");