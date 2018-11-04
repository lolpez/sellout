var rp = require('request-promise');

module.exports = {
	entitySelectionPage: (req, res, next) => {
		if (req.app.get('env') == 'production'){
			var options = {
				method: 'POST',
				uri: req.app.get('webServices').entity.get,
				headers: {
					'Content-Type': 'application/json',
				}
			};
			rp(options).then((response) => {
				res.render('entity/entity selector/index', {
					title: 'Control IPOS',
					user: req.user,
					entities: JSON.parse(response).response
				});
			}).catch(function (err) {
				//Show error
			});
		}else{
			//FAKE DATA FOR DEV PURPOSES 
			res.render('entity/entity selector/index',{ 
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
		}	
	},
	appPage: (req, res, next) => {
		if (req.app.get('env') == 'production'){
			//Entity ID captured by selecting the Entity
			var entityId = req.params.id;
			//Get Customers request
			var requestCustomer = rp({
				method: 'POST',
				uri: req.app.get('webServices').customer.get,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
                    'idUsuario': '1',
					'idtipoDpto': '1'
				})
			});
			//Get Entity request
			var requestEntity = rp({
				method: 'POST',
				uri: req.app.get('webServices').entity.getById,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({idtipoEntidad: entityId})
			});			
			//Get Countries request
			var requestCountry = rp({
				method: 'POST',
				uri: req.app.get('webServices').country.get,
				headers: {
					'Content-Type': 'application/json',
				}
			});
			//Get Cities request
			var requestCity = rp({
				method: 'POST',
				uri: req.app.get('webServices').city.getByCountry,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({idtipoPais: "1"}),
			});
            //Get Product by Entity
            var requestProduct = rp({
                method: 'POST',
                uri: req.app.get('webServices').product.get,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
					idUsuario: 1,
					idtipoEntidad: entityId
                })
			});
			//Get Categories by User and Entity
			var requestCategory = rp({
                method: 'POST',
                uri: req.app.get('webServices').category.get,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
					idUsuario : 1,
					idtipoEntidad: entityId
				})
			});
            //Make all requests in parallel and wait for all of them
			Promise.all([requestCustomer, requestEntity, requestCountry, requestCity, requestProduct, requestCategory]).then(function(responses) {
				//Al requests completed
				var customers	= 	JSON.parse(responses[0]).response;
				var entity 		=	JSON.parse(responses[1]).response;
				var countries 	= 	JSON.parse(responses[2]).response;
				var cities 		=	JSON.parse(responses[3]).response;
                var products 	=	JSON.parse(responses[4]).response;
                var categories	=	JSON.parse(responses[5]).response;
				res.render('entity/app/index', {
					app: req.app.get('config'),
					entity: {
						id: entity.idtipoentidad,
                        name: entity.nomtipoEntidad
					},
					user: req.user,
					customers: customers,
					countries: countries,
					cities: cities,
					products: products,
					categories: categories
				});
			}).catch(function (err) {
				//Show error
			});
		}else{
			//FAKE DATA FOR DEV PURPOSES
			var id = req.params.id;
			if (isNaN(parseInt(id)) || parseInt(id) > 6 || parseInt(id) < 1){
				res.locals.message = `Entidad ${id} no encontrada`;
				res.locals.error = req.app.get('env') === 'development' ? "ID de entidad no válida" : {};
				res.status(500);
				res.render('error/error');
			}else{
				//Request for get Customers takes 0.5 seconds
				var request1 = new Promise(function(resolve, reject) {
					setTimeout(() => {
						resolve({
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
						})
					}, 0.5);
				});
				//Request for get Entity takes 0.5 seconds
				var request2 = new Promise(function(resolve, reject) {
					setTimeout(() => {
						resolve({
							id: id,
							name: "STARBUCKS"
						})
					}, 0.5);
				});
				//Request for get Country takes 0.5 seconds
				var request3 = new Promise(function(resolve, reject) {
					setTimeout(() => {
						resolve({
							"0": {"idtipoPais": 1, "nomtipoPais": "Bolivia"},
							"1": {"idtipoPais": 2, "nomtipoPais": "Argentina"},
							"2": {"idtipoPais": 3, "nomtipoPais": "Brasil"},
							"3": {"idtipoPais": 4, "nomtipoPais": "Peru"},
							"4": {"idtipoPais": 5, "nomtipoPais": "Chile"}
						})
					}, 0.5);
				});
				//Request for get City takes 0.5 seconds
				var request4 = new Promise(function(resolve, reject) {
					setTimeout(() => {
						resolve({
							"0": {"idtipoDpto": 1, "nomtipoDpto": "SCZ"},
							"1": {"idtipoDpto": 2, "nomtipoDpto": "LPZ"},
							"2": {"idtipoDpto": 3, "nomtipoDpto": "CBBA"},
							"3": {"idtipoDpto": 4, "nomtipoDpto": "TAR"}, 
							"4": {"idtipoDpto": 5, "nomtipoDpto": "BEN"},
							"5": {"idtipoDpto": 6, "nomtipoDpto": "PAN"},
							"6": {"idtipoDpto": 7, "nomtipoDpto": "OR"},
							"7": {"idtipoDpto": 8, "nomtipoDpto": "POT"},
							"8": {"idtipoDpto": 9, "nomtipoDpto": "CHU"}
						});
					}, 0.5);
				});
				//Request for get Products takes 0.5 seconds
				var request5 = new Promise(function(resolve, reject) {
					setTimeout(() => {
						resolve({
							"0": {"idtipoProducto": 0, "imgtipoProducto": "/img/starbucks.png", "nomtipoProducto": "product 1", "bartipoProducto": 123},
							"1": {"idtipoProducto": 1, "imgtipoProducto": "", 					"nomtipoProducto": "product 2", "bartipoProducto": 456},
							"2": {"idtipoProducto": 2, "imgtipoProducto": "/img/starbucks.png", "nomtipoProducto": "product 3", "bartipoProducto": 789},
							"3": {"idtipoProducto": 3, "imgtipoProducto": "", 					"nomtipoProducto": "product 4", "bartipoProducto": 065}, 
							"4": {"idtipoProducto": 4, "imgtipoProducto": "/img/starbucks.png", "nomtipoProducto": "product 5", "bartipoProducto": 128},
							"5": {"idtipoProducto": 5, "imgtipoProducto": "/img/starbucks.png", "nomtipoProducto": "product 6", "bartipoProducto": 127},
							"6": {"idtipoProducto": 6, "imgtipoProducto": "", 					"nomtipoProducto": "product 7", "bartipoProducto": 124},
							"7": {"idtipoProducto": 7, "imgtipoProducto": "/img/starbucks.png", "nomtipoProducto": "product 8", "bartipoProducto": 129},
							"8": {"idtipoProducto": 8, "imgtipoProducto": "/img/starbucks.png", "nomtipoProducto": "product 9", "bartipoProducto": 126}
						});
					}, 500);
				});
				//Request for get Categories takes 0.5 seconds
				var request6 = new Promise(function(resolve, reject) {
					setTimeout(() => {
						resolve({
							"0": {"idtipoCategoria": 2, "nomtipoCategoria"	: "Pantalones"	},
							"1": {"idtipoCategoria": 3, "nomtipoCategoria"	: "Blusas"		},
							"2": {"idtipoCategoria": 5, "nomtipoCategoria"	: "Poleras"		},
							"3": {"idtipoCategoria": 6, "nomtipoCategoria"	: "Ropa InterIo"},
							"4": {"idtipoCategoria": 7, "nomtipoCategoria"	: "Bijouteria"	},
							"5": {"idtipoCategoria": 8, "nomtipoCategoria"	: "Pantalones"	},
							"6": {"idtipoCategoria": 9, "nomtipoCategoria"	: "Blusas"		},
							"7": {"idtipoCategoria": 10, "nomtipoCategoria"	: "Poleras"		},
							"8": {"idtipoCategoria": 11, "nomtipoCategoria"	: "Ropa InterIo"},
							"9": {"idtipoCategoria": 12, "nomtipoCategoria"	: "Bijouteria"	}
						});
					}, 500);
				});
				//Make all requests in parallel and wait for all of them
				Promise.all([request1, request2, request3, request4, request5, request6]).then(function(responses) {
					//Al requests completed
					var customers = responses[0];
					var entity = responses[1];
					var countries = responses[2];
					var cities = responses[3];
					var products = responses[4];
					var categories = responses[5];
					res.render('entity/app/index', {
						app: req.app.get('config'),
						entity: entity,
						user: req.user,
						customers: customers,
						countries: countries,
						cities: cities,
						products: products,
						categories: categories
					});
				});
			}
		}
	}
};