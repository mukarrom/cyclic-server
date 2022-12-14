const { ObjectId } = require('mongodb');
const { getAsmatDb } = require('../utils/dbConnect');

// get all Blogs
module.exports.getAllBlogs = async (_req, res, next) => {
	try {
		const db = getAsmatDb();
		const result = await db.collection('blogs').find().toArray();
		res.send(result);
	} catch (error) {
		next(error);
	}
};

// save a Blog
module.exports.saveABlog = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		const data = req.body;
		const result = await db.collection('blogs').insertOne(data);
		res.send(result);
	} catch (error) {
		next(error);
	}
};

// get a specific Blog
module.exports.getABlog = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		const id = req.params.id;
		const result = await db.collection('blogs').findOne({ _id: ObjectId(id) });
		res.send(result);
	} catch (error) {
		next(error);
	}
};

// update a specific Blog
module.exports.updateABlog = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		const id = req.params.id;
		const updateData = req.body;
		const result = await db
			.collection('blogs')
			.updateOne({ _id: ObjectId(id) }, { $set: updateData });
		res.send(result);
	} catch (error) {
		next(error);
	}
};

// delete a specific Blog
module.exports.deleteABlog = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		const id = req.params.id;
		const result = await db
			.collection('blogs')
			.deleteOne({ _id: ObjectId(id) });
		res.send(result);
	} catch (error) {
		next(error);
	}
};
