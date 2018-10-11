var express = require('express');
var router = express.Router();
var entityController = require('../controllers/entity');

/* GET home page. */
router.post('/', entityController.index);
router.get('/login/:id', entityController.login);

module.exports = router;
