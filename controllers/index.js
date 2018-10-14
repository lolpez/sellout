module.exports = {
	loginPage: (req, res, next) => {
		res.render('login');
	},
	authenticate: (req, res, next) => {
		res.redirect("/entity");
	},
};