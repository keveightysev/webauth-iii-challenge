const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

router.post('/login', async (req, res) => {
	let { username, password } = req.body;
	try {
		const user = await Users.findBy({ username }).first();
		if (user && bcrypt.compareSync(password, user.password)) {
			const token = generateToken(user);
			res.status(200).json({
				message: `Welcome ${user.username}`,
				token,
			});
		} else {
			res.status(401).json({ message: 'Invalid credentials' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Server error while logging in' });
	}
});

const generateToken = user => {
	const payload = {
		subject: user.id,
		username: user.username,
		role: user.role,
	};

	const options = {
		expiresIn: '30d',
	};

	return jwt.sign(payload, process.env.JWT_SECRET, options);
};

module.exports = router;
