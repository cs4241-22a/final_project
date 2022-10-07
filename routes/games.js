var express = require('express');
var router = express.Router();
const Results = require("../models/Results");

router.get('/accuracy', function(req, res, next) {
    res.render('accuracy', { title: 'ReactionTests', user : req.user});
})
router.get('/cps', function(req, res, next) {
    res.render('cps', { title: 'ReactionTests', user : req.user});
})
router.get('/reaction', function(req, res, next) {
    res.render('reaction', { title: 'ReactionTests', user : req.user});
})

router.post('/addResult', function (req, res, next) {
    console.log("AddResult: %s", req.body)
    Results.create({owner_id: req.body.owner_id, game_type: req.body.game_type, score: req.body.score}, () => {
        Note.find({owner_id: req.body.owner_id}).lean().exec(function (err, notes) {
            console.log("Found notes: %s", notes);
            res.json(notes)
        })
    })

});

module.exports = router;