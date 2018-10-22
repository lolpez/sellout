var rp = require('request-promise');

module.exports = {
	addCustomer: (req, res, next) => {
		if (req.app.get('env') == 'production'){
			var options = {
				method: 'POST',
				uri: req.app.get('webServices').customer.add,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					data: req.body.data
				})
			};
			rp(options).then((response) => {
				res.send({message: "exito", object: JSON.parse(response).response})
			}).catch(function (err) {
				//Show erro page
			});
		}else{
			//Fake response
			console.log(`Add customer with the following data:`);
			console.log(req.body.data);
			res.send({message: "exito", object: req.body.data})
		}
	},
	getCustomer: (req, res, next) => {
        Console.log('Llego')
		if (req.app.get('env') == 'production'){
			Console.log("Llego");
			//Call Python API for get customer
			var options = {
				method: 'POST',
				uri: req.app.get('webServices').customer.get_by_id, //<-- Add the url for Pyhon Get Customer By ID
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({			//<--Fixed from previous error
					idCliente: req.body.id
				}),
			};
			print ('Opciones:' + options)
			rp(options).then((response) => {
				res.send({message: "exito", object: JSON.parse(response).response}) //<--Return the customer object
			}).catch(function (err) {
				alert ('Error... al invocar el servicio get_clientes_by_id' + err)
			});
		}else{
			//Fake response
			var id = req.body.id;
			console.log(`Returning information of customer ${id}`);
			res.send({message: "exito",
				object: {
					"tipCliente": "N",
					"idCliente": 2,
					"patCliente": "Duran",
					"matCliente": "Soto",
					"nomCliente": "Valeria",
					"canpuntoCliente": "200",
					"tipoGenero": 2,
					"nomtipoGenero": "Femenino",
					"idCliDir": 2,
					"idtipoDireccionD": 2,
					"dirCliente": "Hacienda Santa Maria Casa 12",
					"idCliMail": 1, "idtipoDireccionM": 1,
					"mailCliente": "vsoto@gmail.com",
					"idcliTel": 2,
					"telCliente": "3328818",
					"idcliCel": 1,
					"celCliente": "77345939",
					"idcliId": "1",
					"ciCliente": "12387699SC",
					"idtipoPais": "1",
					"nomtipoPais": "Bolivia",
					"idtipoDpto": "1",
					"nomtipoDpto": "Santa Cruz"
				}
			})
		}
	}
};