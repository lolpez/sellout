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
		entities: {"0": {"idtipoEntidad": 1, "nomtipoEntidad": "Entidad I"}, "1": {"idtipoEntidad": 2, "nomtipoEntidad": "Entidad II"}}
	});
});

module.exports = router;
