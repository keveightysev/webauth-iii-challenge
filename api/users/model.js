const db = requie('../data/dbConfig.js');

module.exports = {
	add,
	find,
	findBy,
};

function find() {
	return db('users').select('id', 'username', 'role');
}

function findBy(filter) {
	return db('users').where(filter);
}

async function add(user) {
	try {
		const [id] = await db('users').insert(user);
		return findBy({ id });
	} catch (err) {
		console.log(err);
	}
}
