var rp = require('request-promise');
var controller = {};

controller.index = (req, res, next) => {
	res.render('entity/index',	{ 
		title: `Entity N.${req.params.id}`
	});
};

module.exports = controller;