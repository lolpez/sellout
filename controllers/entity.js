var rp = require('request-promise');
var controller = {};

controller.index = (req, res, next) => {
	res.render('entity/index',	{ 
		title: `Entity N.${req.body.id}`
	});
};

controller.login = (req, res, next) => {
	res.render('entity/login',	{ 
		title: `Entity N.${req.params.id}`,
		entityId: req.params.id
	});
};
module.exports = controller;