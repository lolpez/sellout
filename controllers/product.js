var rp = require('request-promise');

module.exports = {
	getProduct: (req, res, next) => {
		if (req.app.get('env') == 'production'){
			var options = {
				method: 'POST',
				uri: req.app.get('webServices').product.getById,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({idtipoProducto: req.body.id
				}),
			};
			rp(options).then((response) => {
				res.send({message: "Exito al obtener producto.", object: JSON.parse(response).response})
			}).catch(function (err) {
			});
		}else{
			//Fake response
			var id = req.body.id;
			console.log(`Returning information of product ${id}`);
			res.send({message: "Exito al obtener producto.",
				object: {
					"idtipoProducto": id,
					"nomtipoProducto": "Jeans",
					"pretipoProducto": 100.0,
					"saltipoProducto": 0.0,
					"imgtipoProducto": "/img/starbucks.png"
				}
			})
		}
	}
};