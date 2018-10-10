var express = require('express');
var router = express.Router();
var rp = require('request-promise');

/* GET home page. */
router.get('/', (req, res, next) => {
	var options = {
		method: 'POST',
		uri: '127.0.0.1:8081/api/v1/get_entidades',
		headers: {
            'Content-Type': 'application/json',
        }
	};
	/*
	rp(options).then((res) => {
		res.render('index', { title: 'Control IPOS', entities: JSON.parse(res).response });
	}).catch(function (err) {
			
	});
	*/
	//Fake data
	res.render('index',	{ 
		title: 'Control IPOS',
		entities: {
			"0": {"idtipoEntidad": 1, "nomtipoEntidad": "Entidad I", img: "/img/cinemark.png"},
			"1": {"idtipoEntidad": 2, "nomtipoEntidad": "Entidad II", img: "/img/hard rock.png"},
			"2": {"idtipoEntidad": 3, "nomtipoEntidad": "Entidad III", img: "/img/kyky.jpg"},
			"3": {"idtipoEntidad": 4, "nomtipoEntidad": "Entidad IV", img: "/img/papa johns.png"},
			"4": {"idtipoEntidad": 5, "nomtipoEntidad": "Entidad V", img: "/img/starbucks.png"},
			"5": {"idtipoEntidad": 6, "nomtipoEntidad": "Entidad VI", img: "/img/tigo.png"},
		}
	});
});

module.exports = router;
