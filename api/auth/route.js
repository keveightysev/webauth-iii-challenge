const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/model.js');

router.post('/register', async (req, res) => {
	if (!req.body.username) {
		res.status(406).json({ message: 'Please enter a username' });
		return;
	} else if (!req.body.password) {
		res.status(406).json({ message: 'Please include a password' });
		return;
	} else if (!req.body.role) {
		res.status(406).json({ message: 'Please include a role' });
		return;
	}
	try {
		let user = req.body;
		user.password = bcrypt.hashSync(user.password, 10);
		const newUser = await Users.add(user);
		res.status(201).json(newUser[0]);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Server error creating new user' });
	}
});

module.exports = router;
