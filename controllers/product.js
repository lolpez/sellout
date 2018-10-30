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
				"0": {"idtipoProducto": 0, "imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 1"},
				"1": {"idtipoProducto": 1, "imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 2"},
				"2": {"idtipoProducto": 2, "imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 3"},
				"3": {"idtipoProducto": 3, "imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 4"}, 
				"4": {"idtipoProducto": 4, "imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 5"},
				"5": {"idtipoProducto": 5, "imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 6"},
				"6": {"idtipoProducto": 6, "imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 7"},
				"7": {"idtipoProducto": 7, "imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 8"},
				"8": {"idtipoProducto": 8, "imgtipoProducto": "/img/hard rock.png", "nomtipoProducto": "product 9"}
			}
			res.send({message: "Exito al actualizar productos.",
				object: {
					"html": fn({ products: products })
				}
			})
		}
	}
};