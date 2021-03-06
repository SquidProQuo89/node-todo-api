var {User} = require('./../models/user')


// Authentication middleware - finds a user by their x-auth header token
var authenticate = (req, res, next) => {
	var token = req.header('x-auth');

	User.findByToken(token).then((user) => {
		if (!user) {
			console.log('no user found')
			return Promise.reject();
		}

		req.user = user;
		req.token = token;
		next();

	}).catch((e) => {
		res.status(401).send();
	});
};

module.exports = {authenticate}