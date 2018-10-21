var express = require('express');
var router = express.Router();
var customerController = require('../controllers/customer');

/* GET home page. */
router.post('/', requiresUserLogged, customerController.addCustomer);

function requiresUserLogged(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}
  
module.exports = router;