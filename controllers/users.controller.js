const { getAsmatDb } = require('../utils/dbConnect');
const jwt = require('jsonwebtoken');

module.exports.getAllUsers = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		const users = await db.collection('users').find().toArray();
		res.send(users);
	} catch (error) {
		next(error);
	}
};

// save/update user in database
module.exports.saveAUser = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		const email = req.params.email;
		const user = req.body;
		const result = await db
			.collection('users')
			.updateOne({ email: email }, { $set: user }, { upsert: true });
		const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: '24h',
		});
		res.send({ result, token });
	} catch (error) {
		next(error);
	}
};
// // make an admin
// module.exports.makeAdmin = async (req, res, next) => {
// 	try {
// 		const db = getAsmatDb();
// 		const email = req.params.email;
// 		const result = await db
// 			.collection('users')
// 			.updateOne({ email: email }, { $set: { role: 'admin' } });
// 		res.send({ result });
// 	} catch (error) {
// 		next(error);
// 	}
// };

// make and remove admin
module.exports.handleAdmin = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		const email = req.params.email;
		const action = req.headers.action;
		if (action === 'make_admin') {
			const result = await db
				.collection('users')
				.updateOne({ email: email }, { $set: { role: 'admin' } });
			res.send({ result });
		}
		if (action === 'remove_admin') {
			const result = await db
				.collection('users')
				.updateOne({ email: email }, { $set: { role: '' } });
			res.send({ result });
		}
	} catch (error) {
		next(error);
	}
};

// check/verify admin
module.exports.checkAdmin = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		const email = req.params.email;
		const user = await db.collection('users').findOne({ email: email });
		// handle error if user not found, otherwise server will crash
		if (!user) return res.send('user data not found');
		const isAdmin = user.role === 'admin';
		res.send(isAdmin);
	} catch (error) {
		next(error);
	}
};

// try {
// 	const db = getAsmatDb();
// } catch (error) {
// 	next(error);
// }
