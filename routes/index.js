var express = require('express');
var router = express.Router();
var passport = require('passport');
var indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.loginPage);
router.post('/', passport.authenticate('local', { failureRedirect: '/' }), indexController.authenticate);

module.exports = router;