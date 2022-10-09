var express = require('express');
var router = express.Router();

router.get('/accuracy', function(req, res, next) {
    res.render('accuracy', { title: 'ReactionTests', user : req.user, game_type: "accuracy"});
})
router.get('/cps', function(req, res, next) {
    res.render('cps', { title: 'ReactionTests', user : req.user, game_type: "cps"});
})
router.get('/reaction', function(req, res, next) {
    res.render('reaction', { title: 'ReactionTests', user : req.user, game_type: "reaction"});
})
router.get('/aimtraining', function(req, res, next) {
    res.render('aimtraining', { title: 'ReactionTests', user : req.user, game_type: "aimtraining"});
})

module.exports = router;