var rp = require('request-promise');
var path = require('path');
var nconf = require('nconf');
nconf.argv().env().file({file: path.join(__dirname, '..', 'config.json')});

module.exports = {
	entitySelectionPage: (req, res, next) => {
		//Call Python API for entity get
		/*var options = {
			method: 'POST',
			uri: `${nconf.get("url")}/${nconf.get("apiUrl")}/${nconf.get("apiVersion")}/${nconf.get("entity").get}`,
			headers: {
				'Content-Type': 'application/json',
			}
		};
		rp(options).then((response) => {
			res.render('index', {title: 'Control IPOS', entities: JSON.parse(response).response});
		}).catch(function (err) {
		});*/
		//Fake data
		res.render('entity/entity selector/index',	{ 
			title: 'Control IPOS',
			user: req.user,
			entities: {
				"0": {"idtipoEntidad": 1, "nomtipoEntidad": "Entidad I", imgtipoEntidad: "/img/cinemark.png"},
				"1": {"idtipoEntidad": 2, "nomtipoEntidad": "Entidad II", imgtipoEntidad: "/img/hard rock.png"},
				"2": {"idtipoEntidad": 3, "nomtipoEntidad": "Entidad III", imgtipoEntidad: "/img/kyky.jpg"},
				"3": {"idtipoEntidad": 4, "nomtipoEntidad": "Entidad IV", imgtipoEntidad: "/img/papa johns.png"},
				"4": {"idtipoEntidad": 5, "nomtipoEntidad": "Entidad V", imgtipoEntidad: "/img/starbucks.png"},
				"5": {"idtipoEntidad": 6, "nomtipoEntidad": "Entidad VI", imgtipoEntidad: "/img/tigo.png"},
			}
		});
	},
	appPage: (req, res, next) => {
		//Call Python API for customer get
		/*var id = req.params.id;
		//Fake validation
		if (isNaN(parseInt(id)) || parseInt(id) > 6 || parseInt(id) < 1){
			res.locals.message = `Entidad ${id} no encontrada`;
			res.locals.error = req.app.get('env') === 'development' ? "ID de entidad no válida" : {};
			res.status(500);
			res.render('error/error');
		}else{
			var options = {
				method: 'POST',
				uri: `${nconf.get("url")}/${nconf.get("apiUrl")}/${nconf.get("apiVersion")}/${nconf.get("customer").get}`,
				headers: {
					'Content-Type': 'application/json',
				}
			};
			rp(options).then((response) => {
				res.render('entity/app/index', {
					entityId: id,
					user: req.user,
					customers: JSON.parse(response).response
				})
				res.render('index', {title: 'Control IPOS', entities: JSON.parse(response).response});
			}).catch(function (err) {
			});
		}*/


		var id = req.params.id;
		//Fake validation
		if (isNaN(parseInt(id)) || parseInt(id) > 6 || parseInt(id) < 1){
			res.locals.message = `Entidad ${id} no encontrada`;
			res.locals.error = req.app.get('env') === 'development' ? "ID de entidad no válida" : {};
			res.status(500);
			res.render('error/error');
		}else{
			//Fake data
			res.render('entity/app/index', {
				title: `Entity ${id}`,
				entityId: id,
				user: req.user,
				customers: {
					"0": {"idCliente": 0, "patCliente": "Paterno 0", "matCliente": "Materno 0", "nomCliente": "Nombre 0"},
					"1": {"idCliente": 1, "patCliente": "Paterno 1", "matCliente": "Materno 1", "nomCliente": "Nombre 1"},
					"2": {"idCliente": 2, "patCliente": "Paterno 2", "matCliente": "Materno 2", "nomCliente": "Nombre 2"},
					"3": {"idCliente": 3, "patCliente": "Paterno 3", "matCliente": "Materno 3", "nomCliente": "Nombre 3"},
					"4": {"idCliente": 4, "patCliente": "Paterno 4", "matCliente": "Materno 4", "nomCliente": "Nombre 4"},
					"5": {"idCliente": 5, "patCliente": "Paterno 5", "matCliente": "Materno 5", "nomCliente": "Nombre 5"},
					"6": {"idCliente": 6, "patCliente": "Paterno 6", "matCliente": "Materno 6", "nomCliente": "Nombre 6"},
					"7": {"idCliente": 7, "patCliente": "Paterno 7", "matCliente": "Materno 7", "nomCliente": "Nombre 7"},
					"8": {"idCliente": 8, "patCliente": "Paterno 8", "matCliente": "Materno 8", "nomCliente": "Nombre 8"},
					"9": {"idCliente": 9, "patCliente": "Paterno 9", "matCliente": "Materno 9", "nomCliente": "Nombre 9"}
				}
			});
		}
	}
};