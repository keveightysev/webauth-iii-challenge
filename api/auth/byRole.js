module.exports = byRole = role => {
	return (req, res, next) => {
		if (req.decodedJwt && req.decodedJwt.role && req.decodedJwt.role === role) {
			next();
		} else {
			res
				.status(401)
				.json({ message: 'You do not have the required authorization level' });
		}
	};
};
