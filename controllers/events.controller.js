const { ObjectId } = require('mongodb');
const { getAsmatDb } = require('../utils/dbConnect');

// get all events
module.exports.getAllEvents = async (_req, res, next) => {
	try {
		const db = getAsmatDb();
		const result = await db.collection('events').find().toArray();
		res.send(result);
	} catch (error) {
		next(error);
	}
};

// save a event
module.exports.saveAEvent = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		const data = req.body;
		const result = await db.collection('events').insertOne(data);
		res.send(result);
	} catch (error) {
		next(error);
	}
};

// get a specific event
module.exports.getAEvent = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		const id = req.params.id;
		const result = await db.collection('events').findOne({ _id: ObjectId(id) });
		res.send(result);
	} catch (error) {
		next(error);
	}
};

// update a specific event
module.exports.updateAEvent = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		const id = req.params.id;
		const updateData = req.body;
		const result = await db
			.collection('events')
			.updateOne({ _id: ObjectId(id) }, { $set: updateData });
		res.send(result);
	} catch (error) {
		next(error);
	}
};

// delete a specific event
module.exports.deleteAEvent = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		const id = req.params.id;
		const result = await db
			.collection('events')
			.deleteOne({ _id: ObjectId(id) });
		res.send(result);
	} catch (error) {
		next(error);
	}
};
