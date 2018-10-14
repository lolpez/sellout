var express = require('express');
var router = express.Router();
var passport = require('passport');
var indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.loginPage);
router.get('/logout', requiresUserLogged, indexController.logout);
router.post('/', passport.authenticate('local', { failureRedirect: '/',  failureFlash : true }), indexController.authenticate);

function requiresUserLogged(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

module.exports = router;