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
				"1"	: {"idtipoProducto": 1,		"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 1"	},
				"2"	: {"idtipoProducto": 2,		"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 2"	},
				"3"	: {"idtipoProducto": 3,		"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 3"	},
				"4"	: {"idtipoProducto": 4,		"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 4"	}, 
				"5"	: {"idtipoProducto": 5,		"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 5"	},
				"6"	: {"idtipoProducto": 6,		"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 6"	},
				"7"	: {"idtipoProducto": 7,		"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 7"	},
				"8"	: {"idtipoProducto": 8,		"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 8"	},
				"9"	: {"idtipoProducto": 9,		"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 9"	},
				"10": {"idtipoProducto": 10, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 10"},
				"11": {"idtipoProducto": 11, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 11"},
				"12": {"idtipoProducto": 12, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 12"},
				"13": {"idtipoProducto": 13, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 13"},
				"14": {"idtipoProducto": 14, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 14"},
				"15": {"idtipoProducto": 15, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 15"},
				"16": {"idtipoProducto": 16, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 16"},
				"17": {"idtipoProducto": 17, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 17"},
				"18": {"idtipoProducto": 18, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 18"},
				"19": {"idtipoProducto": 19, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 19"},
				"20": {"idtipoProducto": 20, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 20"},
				"21": {"idtipoProducto": 21, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 21"},
				"22": {"idtipoProducto": 22, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 22"},
				"23": {"idtipoProducto": 23, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 23"},
				"24": {"idtipoProducto": 24, 	"imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 24"},
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
				"1"	: {"idtipoProducto": 1,		"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 1" },
				"2"	: {"idtipoProducto": 2,		"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 2" },
				"3"	: {"idtipoProducto": 3,		"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 3" },
				"4"	: {"idtipoProducto": 4,		"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 4" }, 
				"5"	: {"idtipoProducto": 5,		"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 5" },
				"6"	: {"idtipoProducto": 6,		"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 6" },
				"7"	: {"idtipoProducto": 7,		"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 7" },
				"8"	: {"idtipoProducto": 8,		"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 8" },
				"9"	: {"idtipoProducto": 9,		"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 9" },
				"10": {"idtipoProducto": 10, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 10"},
				"11": {"idtipoProducto": 11, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 11"},
				"12": {"idtipoProducto": 12, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 12"},
				"13": {"idtipoProducto": 13, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 13"},
				"14": {"idtipoProducto": 14, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 14"},
				"15": {"idtipoProducto": 15, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 15"},
				"16": {"idtipoProducto": 16, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 16"},
				"17": {"idtipoProducto": 17, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 17"},
				"18": {"idtipoProducto": 18, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 18"},
				"19": {"idtipoProducto": 19, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 19"},
				"20": {"idtipoProducto": 20, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 20"},
				"21": {"idtipoProducto": 21, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 21"},
				"22": {"idtipoProducto": 22, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 22"},
				"23": {"idtipoProducto": 23, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 23"},
				"24": {"idtipoProducto": 24, 	"imgtipoProducto": "/img/kyky.jpg", "nomtipoProducto": "jeans 24"}
			}
			res.send({message: "Exito al actualizar productos por categoria.",
				object: {
					"html": fn({ products: products })
				}
			})
		}
	}
};