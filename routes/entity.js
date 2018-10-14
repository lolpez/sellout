var express = require('express');
var router = express.Router();
var passport = require('passport');
var entityController = require('../controllers/entity');

/* GET home page. */
router.get('/', requiresUserLogged, entityController.entitySelectionPage);

router.get('/:id',  requiresUserLogged, entityController.appPage);

function requiresUserLogged(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}
  
module.exports = router;