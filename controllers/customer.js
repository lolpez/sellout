var rp = require('request-promise');
var path = require('path');
var nconf = require('nconf');
nconf.argv().env().file({file: path.join(__dirname, '..', 'config.json')});

module.exports = {
	addCustomer: (req, res, next) => {
		if (process.env.NODE_ENV == 'production'){
			//Call Python API for customer insert
			var options = {
				method: 'POST',
				uri: `${nconf.get("url")}/${nconf.get("apiUrl")}/${nconf.get("apiVersion")}/${nconf.get("customer").add}`,
				headers: {
					'Content-Type': 'application/json',
				},
				body: {
					data: JSON.stringify (req.body.data)
				},
			};
			print (options)
			rp(options).then((response) => {
				res.send({message: "exito", object: JSON.parse(response).response})
			}).catch(function (err) {
				//Show error
			});
		}else{
			//Fake response
			console.log(req.body.data);
			res.send({message: "exito", object: req.body.data})
		}
	}
};