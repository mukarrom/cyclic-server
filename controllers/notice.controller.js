const { ObjectId } = require('mongodb');
const { getAsmatDb } = require('../utils/dbConnect');

// save a notice
module.exports.saveANotice = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		const notice = req.body;
		const result = await db.collection('notice').insertOne(notice);
		res.send({ success: true, result });
	} catch (error) {
		next({ success: false, error });
	}
};

// get all notice
module.exports.getAllNotice = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		const result = await db.collection('notice').find().toArray();
		res.send(result);
	} catch (error) {
		next(error);
	}
};

// get a specific notice
module.exports.getANotice = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		const id = req.params.id;
		const result = await db.collection('notice').findOne({ _id: ObjectId(id) });
		res.send(result);
	} catch (error) {
		next(error);
	}
};

// update a specific notice
module.exports.updateANotice = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		const id = req.params.id;
		const updatedNotice = req.body;
		const result = await db
			.collection('notice')
			.updateOne({ _id: ObjectId(id) }, { $set: updatedNotice });
		res.send({ success: true, result });
	} catch (error) {
		next({ success: false, error });
	}
};

// delete a notice
module.exports.deleteANotice = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		const id = req.params.id;
		const result = await db
			.collection('notice')
			.deleteOne({ _id: ObjectId(id) });
		res.send({ success: true, result });
	} catch (error) {
		next({ success: false, error });
	}
};
