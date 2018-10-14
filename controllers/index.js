module.exports = {
	loginPage: (req, res, next) => {
		if (req.user) {
			//user already logged
			res.redirect("/entity");
		} else {
			//user not logged
			res.render('login');
		}
	},
	authenticate: (req, res, next) => {
		//Check is user exits in database, etc..
		res.redirect("/entity");
	},
	logout: (req, res, next) => {
		req.logout();
		res.redirect('/');
	}
};