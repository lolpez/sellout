var express = require('express');
var router = express.Router();
var cityController = require('../controllers/city');

/* GET home page. */
router.post('/get', requiresUserLogged, cityController.getCities);

function requiresUserLogged(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}
  
module.exports = router;