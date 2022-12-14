const { getAsmatDb } = require('../utils/dbConnect');

// verify admin middleware
const verifyAdmin = async (req, res, next) => {
	const requester = req.decoded.email;
	const db = getAsmatDb();
	const requesterAccount = await db
		.collection('users')
		.findOne({ email: requester });
	if (requesterAccount.role === 'admin') {
		next();
	} else {
		res.status(403).send({ message: 'Forbidden, Only admin can access' });
	}
};

module.exports = verifyAdmin;
