module.exports = {
	addCustomer: (req, res, next) => {
		console.log(req.body.data);
		res.send({message: "exito", object: req.body.data})
	}
};