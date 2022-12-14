const { getAsmatDb } = require('../utils/dbConnect');
const jwt = require('jsonwebtoken');

module.exports.getTest = async (req, res, next) => {
	try {
		// const db = getAsmatDb();
		// const users = await db.collection('users').find().toArray();
		res.send('hello world test');
	} catch (error) {
		next(error);
	}
};
