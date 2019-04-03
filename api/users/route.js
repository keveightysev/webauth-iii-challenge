const router = require('express').Router();

const Users = require('./model.js');
const byRole = require('../auth/byRole.js');

router.get('/', async (req, res) => {
	try {
		const users = await Users.find();
		res.status(200).json(users);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Server error retrieving users list' });
	}
});

router.get('/teacher', byRole('teacher'), async (req, res) => {
	try {
		const users = await Users.find();
		res.status(200).json(users);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Server error accessing teacher portal' });
	}
});

router.get('/student', byRole('student'), (req, res) => {
	res.status(200).json({ message: 'Welcome to student portal!' });
});

module.exports = router;
