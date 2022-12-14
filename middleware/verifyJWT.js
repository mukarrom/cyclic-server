const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
	// get token from client side from headers
	const authHeader = req.headers.authorization;
	// check token exists or not, if not can't access
	if (!authHeader) {
		return res.status(401).send({ message: 'Unauthorized Access' });
	}
	// split token
	const token = authHeader.split(' ')[1];
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
		if (err) {
			return res.status(403).send({ message: 'Forbidden access' });
		}
		req.decoded = decoded;
		next();
	});
}

module.exports = verifyJWT;
