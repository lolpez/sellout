var rp = require('request-promise');
var path = require('path');
var nconf = require('nconf');
nconf.argv().env().file({file: path.join(__dirname, '..', 'config.json')});

module.exports = {
	addCustomer: (req, res, next) => {
		//Call Python API for customer insert
		/*var options = {
			method: 'POST',
			uri: `${nconf.get("url")}/${nconf.get("apiUrl")}/${nconf.get("apiVersion")}/${nconf.get("customer").add}`,
			headers: {
				'Content-Type': 'application/json',
			},
			body: {
				data: req.body.data
			},
		};	
		rp(options).then((object) => {
			res.send({message: "exito", object: object})
		}).catch(function (err) {
		});*/		

		//Fake response
		console.log(req.body.data);
		res.send({message: "exito", object: req.body.data})
	}
};