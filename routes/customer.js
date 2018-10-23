var express = require('express');
var router = express.Router();
var customerController = require('../controllers/customer');

/* GET home page. */
router.post('/add', requiresUserLogged, customerController.addCustomer);
router.post('/update', requiresUserLogged, customerController.updateCustomer);
router.post('/get', requiresUserLogged, customerController.getCustomer);

function requiresUserLogged(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}
  
module.exports = router;