var rp = require('request-promise');
var pug = require('pug');

module.exports = {
	getProduct: (req, res, next) => {
		if (req.app.get('env') == 'production'){
			var options = {
				method: 'POST',
				uri: req.app.get('webServices').product.getById,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({idtipoProducto: req.body.id}),
			};
			rp(options).then((response) => {
				res.send({message: "Exito al obtener producto.", object: JSON.parse(response).response})
			}).catch(function (err) {
			});
		}else{
			//Fake response
			var id = req.body.id;
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
	},
	getProducts: (req, res, next) => {
		if (req.app.get('env') == 'production'){
			var options = {
				method: 'POST',
                uri: req.app.get('webServices').product.get,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
					idUsuario: 1,
					idtipoEntidad: req.body.entityId
                })
			};
			rp(options).then((response) => {
				var fn = pug.compileFile('./views/entity/app/products.pug');
				res.send({message: "Exito al actualizar productos.",
					object: {
						"html": fn({ products: JSON.parse(response).response })
					}
				})
			}).catch(function (err) {
				//Show error
			});
		}else{
			//Fake response
			var fn = pug.compileFile('./views/entity/app/products.pug');
			var products = {
				"1"	: {"idtipoProducto": 1,		"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 1"	, "bartipoProducto": 223},
				"2"	: {"idtipoProducto": 2,		"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 2"	, "bartipoProducto": 223},
				"3"	: {"idtipoProducto": 3,		"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 3"	, "bartipoProducto": 223},
				"4"	: {"idtipoProducto": 4,		"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 4"	, "bartipoProducto": 223}, 
				"5"	: {"idtipoProducto": 5,		"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 5"	, "bartipoProducto": 223},
				"6"	: {"idtipoProducto": 6,		"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 6"	, "bartipoProducto": 113},
				"7"	: {"idtipoProducto": 7,		"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 7"	, "bartipoProducto": 113},
				"8"	: {"idtipoProducto": 8,		"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 8"	, "bartipoProducto": 113},
				"9"	: {"idtipoProducto": 9,		"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 9"	, "bartipoProducto": 113},
				"10": {"idtipoProducto": 10, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 10", "bartipoProducto": 113},
				"11": {"idtipoProducto": 11, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 11", "bartipoProducto": 113},
				"12": {"idtipoProducto": 12, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 12", "bartipoProducto": 333},
				"13": {"idtipoProducto": 13, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 13", "bartipoProducto": 333},
				"14": {"idtipoProducto": 14, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 14", "bartipoProducto": 333},
				"15": {"idtipoProducto": 15, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 15", "bartipoProducto": 333},
				"16": {"idtipoProducto": 16, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 16", "bartipoProducto": 333},
				"17": {"idtipoProducto": 17, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 17", "bartipoProducto": 123},
				"18": {"idtipoProducto": 18, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 18", "bartipoProducto": 123},
				"19": {"idtipoProducto": 19, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 19", "bartipoProducto": 444},
				"20": {"idtipoProducto": 20, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 20", "bartipoProducto": 444},
				"21": {"idtipoProducto": 21, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 21", "bartipoProducto": 444},
				"22": {"idtipoProducto": 22, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 22", "bartipoProducto": 444},
				"23": {"idtipoProducto": 23, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 23", "bartipoProducto": 123},
				"24": {"idtipoProducto": 24, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 24", "bartipoProducto": 666}
			}
			res.send({message: "Exito al actualizar productos.",
				object: {
					"html": fn({ products: products })
				}
			})
		}
	},
	getProductsByCategory: (req, res, next) => {
		if (req.app.get('env') == 'production'){
			var options = {
				method: 'POST',
                uri: req.app.get('webServices').product.getByCategory,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
					idUsuario: 1,
					idtipoEntidad: req.body.entityId,
					idtipoCategoria: req.body.CategoryId
                })
			};
			rp(options).then((response) => {
				var fn = pug.compileFile('./views/entity/app/products.pug');
				res.send({message: "Exito al actualizar productos por categoria.",
					object: {
						"html": fn({ products: JSON.parse(response).response })
					}
				})
			}).catch(function (err) {
				//Show error
			});
		}else{
			//Fake response
			var fn = pug.compileFile('./views/entity/app/products.pug');
			var products = {
				"1"	: {"idtipoProducto": 1,		"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 1" , "bartipoProducto": 123},
				"2"	: {"idtipoProducto": 2,		"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 2" , "bartipoProducto": 123},
				"3"	: {"idtipoProducto": 3,		"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 3" , "bartipoProducto": 123},
				"4"	: {"idtipoProducto": 4,		"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 4" , "bartipoProducto": 123}, 
				"5"	: {"idtipoProducto": 5,		"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 5" , "bartipoProducto": 123},
				"6"	: {"idtipoProducto": 6,		"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 6" , "bartipoProducto": 123},
				"7"	: {"idtipoProducto": 7,		"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 7" , "bartipoProducto": 143},
				"8"	: {"idtipoProducto": 8,		"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 8" , "bartipoProducto": 143},
				"9"	: {"idtipoProducto": 9,		"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 9" , "bartipoProducto": 143},
				"10": {"idtipoProducto": 10, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 10", "bartipoProducto": 663},
				"11": {"idtipoProducto": 11, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 11", "bartipoProducto": 663},
				"12": {"idtipoProducto": 12, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 12", "bartipoProducto": 143},
				"13": {"idtipoProducto": 13, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 13", "bartipoProducto": 143},
				"14": {"idtipoProducto": 14, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 14", "bartipoProducto": 143},
				"15": {"idtipoProducto": 15, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 15", "bartipoProducto": 143},
				"16": {"idtipoProducto": 16, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 16", "bartipoProducto": 143},
				"17": {"idtipoProducto": 17, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 17", "bartipoProducto": 143},
				"18": {"idtipoProducto": 18, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 18", "bartipoProducto": 143},
				"19": {"idtipoProducto": 19, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 19", "bartipoProducto": 143},
				"20": {"idtipoProducto": 20, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 20", "bartipoProducto": 142},
				"21": {"idtipoProducto": 21, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 21", "bartipoProducto": 142},
				"22": {"idtipoProducto": 22, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 22", "bartipoProducto": 142},
				"23": {"idtipoProducto": 23, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 23", "bartipoProducto": 142},
				"24": {"idtipoProducto": 24, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 24", "bartipoProducto": 142}
			}
			res.send({message: "Exito al actualizar productos por categoria.",
				object: {
					"html": fn({ products: products })
				}
			})
		}
	}
};