var rp = require('request-promise');

module.exports = {
	pay: (req, res, next) => {
		if (req.app.get('env') == 'production'){
			var options = {
				method: 'POST',
				uri: req.app.get('webServices').payment.pay,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(
					{
						idUsuario: 1,
						ipUsuario: "192.168.0.1",
						idtipoEntidad: req.body.entityId,
						idCliente: req.body.customerId,
						porcDescto: req.body.discount,
						items: req.body.items,
						formaspago: req.body.paymentMethods
					}
				),
			};
			rp(options).then((response) => {
				res.send({message: "Exito al realizar pago.", object: JSON.parse(response).response})
			}).catch(function (err) {
			});
		}else{
			//Fake response
			console.log(req.body);
			res.send({message: "Exito al realizar pago.",
				object: {
					idUsuario: 1,
					ipUsuario: "192.168.0.1",
					idtipoEntidad: req.body.entityId,
					idCliente: req.body.customerId,
					porcDescto: req.body.discount,
					items: req.body.items,
					formaspago: req.body.paymentMethods
				}
			})
		}
	}
};