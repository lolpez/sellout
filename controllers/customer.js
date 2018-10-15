var path = require('path');
var nconf = require('nconf');
nconf.argv().env().file({file: path.join(__dirname, '..', 'config.json')});

module.exports = {
	wsName: module.filename.slice(__filename.lastIndexOf(path.sep)+1, module.filename.length -3),
	addCustomer: (req, res, next) => {		
		console.log(`Call to WS ${nconf.get(url)}/${nconf.get(apiUrl)}/${nconf.get(apiVersion)}/${nconf.get(wsName).add}`)
		console.log(req.body.data);
		res.send({message: "exito", object: req.body.data})
	}
};