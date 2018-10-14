var express = require('express');
var router = express.Router();
var entityController = require('../controllers/entity');

/* GET home page. */
router.get('/', entityController.entitySelectionPage);
router.get('/:id', entityController.appPage);
  
module.exports = router;