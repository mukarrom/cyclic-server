const { ObjectId } = require('mongodb');
const { getAsmatDb } = require('../utils/dbConnect');

// get all Datas
module.exports.getAllData = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		const dbCollectionName = req.headers.dynamic;
		const result = await db
			.collection(dbCollectionName)
			.find({}, { sort: { $natural: -1 } })
			.toArray();
		res.send(result);
	} catch (error) {
		next(error);
	}
};

// get a specific Data filter with id
module.exports.getAData = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		const dbCollectionName = req.headers.dynamic;
		const id = req.params.id;
		const result = await db
			.collection(dbCollectionName)
			.findOne({ _id: ObjectId(id) });
		res.send(result);
	} catch (error) {
		next(error);
	}
};

// get first data
module.exports.getFirstData = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		const dbCollectionName = req.headers.dynamic;
		// const id = req.params.id;
		const result = await db.collection(dbCollectionName).findOne();
		res.send(result);
	} catch (error) {
		next(error);
	}
};

// save a Data
module.exports.saveAData = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		const dbCollectionName = req.headers.dynamic;
		const data = req.body;
		const result = await db.collection(dbCollectionName).insertOne(data);
		res.send(result);
	} catch (error) {
		next(error);
	}
};

// update a specific Data
module.exports.updateAData = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		const dbCollectionName = req.headers.dynamic;
		const id = req.params.id;
		const updateData = req.body;
		const result = await db
			.collection(dbCollectionName)
			.updateOne({ _id: ObjectId(id) }, { $set: updateData });
		res.send(result);
	} catch (error) {
		next(error);
	}
};

// delete a specific Data
module.exports.deleteAData = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		const dbCollectionName = req.headers.dynamic;
		const id = req.params.id;
		const result = await db
			.collection(dbCollectionName)
			.deleteOne({ _id: ObjectId(id) });
		res.send(result);
	} catch (error) {
		next(error);
	}
};

// get with condition Data
module.exports.getLastData = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		const dbCollectionName = req.headers.dynamic;
		const result = await db
			.collection(dbCollectionName)
			.find({}, { sort: { $natural: -1 }, limit: 1 })
			.toArray();
		res.send(result);
	} catch (error) {
		next(error);
	}
};
