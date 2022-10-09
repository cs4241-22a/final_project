var express = require('express');
var router = express.Router();
const Results = require("../models/Results");

router.get('/leaderboard', function (req, res, next) {
    res.render('leaderboard', { title: 'ReactionTests', user : req.user});
})

router.get('/getResults', function(req, res, next) {
    console.log("Getting scores: %s", req.body)
    Results.find(req.body.game_type !== null ? {game_type: req.body.game_type}: {}).lean().exec(function(err, documents) {
        console.log("Found scores: %s", documents)
        res.json(documents)
    })    
})

router.get("/getResultsForUser", function(req, res, next) {
    console.log("Getting scores for user: %s", req.body)
    Results.find({owner_id: req.body.owner_id}).lean().exec(function(err, documents) {
        console.log("Found scores: %s", documents)
        res.json(documents)
    })
})

router.post('/addResult', function (req, res, next) {
    console.log("AddResult: %s", req.body)
    Results.create({owner_id: req.body.owner_id, game_type: req.body.game_type, score: req.body.score}, () => {
        Results.find({game_type: req.body.game_type}).lean().exec(function (err, documents) {
            console.log("Found results: %s", documents);
            res.json(documents)
        })
    })
});

module.exports = router;