var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', (req, res, next) => {
	res.render('entity/index',	{ 
		title: `Entity Nº${req.params.id}`
	});
});

module.exports = router;
