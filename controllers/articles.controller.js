const { ObjectId } = require('mongodb');
const { getAsmatDb } = require('../utils/dbConnect');

module.exports.getArticles = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		const category = req.query.category;
		// console.log(category);
		// find last data
		const result = await db
			.collection(category)
			.find({}, { sort: { $natural: -1 }, limit: 1 })
			.toArray();
		res.send(result);
	} catch (error) {
		next(error);
	}
};

module.exports.updateArticles = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		// const category = req.params.category;
		const data = req.body;
		// console.log(data.category);
		const result = await db.collection(data.category).insertOne(data);
		res.send({ success: true, result });
	} catch (error) {
		next({ success: false, error });
	}
};
