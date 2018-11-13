var rp = require('request-promise');

module.exports = {
	pay: (req, res, next) => {
		if (req.app.get('env') == 'production'){
			var options = {
				method: 'POST',
				uri: req.app.get('webServices').city.getByCountry,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({idtipoPais: req.body.id}),
			};
			rp(options).then((response) => {
				res.send({message: "Exito al obtener ciudades.", object: JSON.parse(response).response})
			}).catch(function (err) {
			});
		}else{
			//Fake response
			console.log(req.body);
			res.send({message: "Exito al obtener ciudades.",
				object: {
					
				}
			})
		}
	}
};