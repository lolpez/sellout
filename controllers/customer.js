var rp = require('request-promise');

module.exports = {
	addCustomer: (req, res, next) => {
		if (req.app.get('env') == 'production'){
			//Call Python API for customer insert
			var options = {
				method: 'POST',
				uri: req.app.get('webServices').customer.add,
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