var express = require('express');
var router = express.Router();

router.get('/accuracy', function(req, res, next) {
    res.render('accuracy', { title: 'ReactionTests', user : req.user});
})
router.get('/cps', function(req, res, next) {
    res.render('cps', { title: 'ReactionTests', user : req.user});
})
router.get('/reaction', function(req, res, next) {
    res.render('reaction', { title: 'ReactionTests', user : req.user});
})

module.exports = router;