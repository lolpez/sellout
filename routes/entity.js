var express = require('express');
var router = express.Router();
var passport = require('passport');
var entityController = require('../controllers/entity');

/* GET home page. */
router.get('/', requiresUserLogged, entityController.entitySelectionPage);
router.get('/:id', requiresUserLogged, entityController.appPage);
router.post('/addCustomer', requiresUserLogged, entityController.addCustomer);

function requiresUserLogged(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}
  
module.exports = router;