var express = require('express');
var router = express.Router();
var productController = require('../controllers/product');

/* GET home page. */
router.post('/get', requiresUserLogged, productController.getProduct);

function requiresUserLogged(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}
  
module.exports = router;