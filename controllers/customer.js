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
					data: JSON.stringify(req.body.data)
				},
			};
			rp(options).then((response) => {
				res.send({message: "exito", object: JSON.parse(response).response})
			}).catch(function (err) {
				//THE ERROR MESSAGE SHOULD BE HERE
				//test
				console.log(err)
			});
		}else{
			//Fake response
			console.log(`Add customer with the following data:`);
			console.log(req.body.data);
			res.send({message: "exito", object: req.body.data})
		}
	},
	getCustomer: (req, res, next) => {
		if (req.app.get('env') == 'production'){
			//Call Python API for get customer
			/*
			var options = {
				method: 'POST',
				uri: req.app.get('webServices').customer.get,
				headers: {
					'Content-Type': 'application/json',
				},
				body: {
					data: JSON.stringify (req.body.id)
				},
			};
			print (options)
			rp(options).then((response) => {
				res.send({message: "exito", object: JSON.parse(response).response})
			}).catch(function (err) {
				//Show error
			});
			*/
		}else{
			//Fake response
			var id = req.body.id;
			console.log(`Returning information of customer ${id}`);
			res.send({message: "exito",
				object: {
					"idCliente": id,
					"patCliente": "Duran",
					"matCliente": "Soto",
					"nomCliente": "Valeria",
					"idtipoGenero": 2,
					"nomtipoGenero": "Femenino",
					"idCliDir": 2, "idtipoDireccion": 2,
					"detalleDir": "Hacienda Santa Maria Casa 12",
					"canpuntoCliente": "200",
					"idcliTel": 2,
					"numeroTel": "3328818",
					"idcliCel": 1,
					"numeroCel": "77345939",
					"idcliId": "1",
					"numId":"12387699SC",
					"idtipoPais": "1",
					"nomtipoPais": "Bolivia",
					"idtipoDpto": "1",
					"nomtipoDpto": "Santa Cruz"
				}
			})
		}
	}
};