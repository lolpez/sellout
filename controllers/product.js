var rp = require('request-promise');

module.exports = {
	getProducts: (req, res, next) => {
		if (req.app.get('env') == 'production'){
			var options = {
				method: 'POST',
				uri: req.app.get('webServices').product.get,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					idUsuario: req.body.id,
					idtipoEntidad: entityId
				}),
			};
			rp(options).then((response) => {
				res.send({message: "Exito al obtener productos.", object: JSON.parse(response).response})
			}).catch(function (err) {
			});
		}else{
			//Fake response
			var id = req.body.id;
			console.log(`Returning information of productos by entidad ${id}`);
			res.send({message: "Exito al obtener ciudades.",
				object: {
					"0": {"idtipoProducto": 1, "nomtipoProducto": "Jeans", "pretipoProducto": 100.0, "saltipoProducto": 0.0, "imgtipoProducto": ""},
					"1": {"idtipoProducto": 1, "nomtipoProducto": "Polera", "pretipoProducto": 90.0, "saltipoProducto": 0.0, "imgtipoProducto": ""}
				}
			})
		}
	}
};