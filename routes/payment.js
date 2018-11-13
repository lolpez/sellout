var express = require('express');
var router = express.Router();
var paymentController = require('../controllers/payment');

/* GET home page. */
router.post('/', requiresUserLogged, paymentController.pay);

function requiresUserLogged(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}
  
module.exports = router;