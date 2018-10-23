var rp = require('request-promise');

module.exports = {
	getCities: (req, res, next) => {
		if (req.app.get('env') == 'production'){
			var options = {
				method: 'POST',
				uri: req.app.get('webServices').city.get,
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
			var id = req.body.id;
			console.log(`Returning information of cities by country ${id}`);
			res.send({message: "Exito al obtener ciudades.",
				object: {
					"0": {"idtipoDpto": 1, "nomtipoDpto": "city 1"},
					"1": {"idtipoDpto": 2, "nomtipoDpto": "city 2"},
					"2": {"idtipoDpto": 3, "nomtipoDpto": "city 3"},
					"3": {"idtipoDpto": 4, "nomtipoDpto": "city 4"}, 
					"4": {"idtipoDpto": 5, "nomtipoDpto": "city 5"},
					"5": {"idtipoDpto": 6, "nomtipoDpto": "city 6"},
					"6": {"idtipoDpto": 7, "nomtipoDpto": "city 7"},
					"7": {"idtipoDpto": 8, "nomtipoDpto": "city 8"},
					"8": {"idtipoDpto": 9, "nomtipoDpto": "city 9"}
				}
			})
		}
	}
};