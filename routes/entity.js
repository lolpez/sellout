var express = require('express');
var router = express.Router();
var entityController = require('../controllers/entity');

/* GET home page. */
router.get('/', entityController.index);
router.get('/:id', entityController.app);

module.exports = router;