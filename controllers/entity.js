var rp = require('request-promise');

module.exports = {
	entitySelectionPage: (req, res, next) => {
		/*
		var options = {
			method: 'POST',
			uri: 'http://127.0.0.1:8081/api/v1/get_entidades',
			headers: {
				'Content-Type': 'application/json',
			}
		};	
		rp(options).then((res) => {
			res.render('index', { title: 'Control IPOS', entities: JSON.parse(res).response });
		}).catch(function (err) {
		});
		*/
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
		var id = req.params.id;
		//Fake validation
		if (isNaN(parseInt(id)) || parseInt(id) > 6 || parseInt(id) < 1){
			res.locals.message = `Entidad ${id} no encontrada`;
			res.locals.error = req.app.get('env') === 'development' ? "ID de entidad no válida" : {};
			res.status(500);
			res.render('error/error');
		}else{
			res.render('entity/app/index', {
				entityId: id,
				user: req.user
			})
		}
	},
	addCustomer: (req, res, next) => {
		console.log(req.body.data);
		res.send({message: "exito", object: req.body.data})
	}
};