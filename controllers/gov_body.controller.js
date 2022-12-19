const { ObjectId } = require('mongodb');
const { getAsmatDb } = require('../utils/dbConnect');

// save a data with last position
module.exports.saveGovBody = async (req, res, next) => {
	try {
		const db = getAsmatDb();
		// const dbCollectionName = req.headers.dynamic;
		const data = req.body;
		const lengthBody = await db.collection('gov_body').estimatedDocumentCount();
		const bodies = { ...data, position: lengthBody + 1 };
		const result = await db.collection('gov_body').insertOne(bodies);
		res.send(result);
	} catch (error) {
		next(error);
	}
};

//+++++++++++++ update governing body position number
module.exports.updateGovBody = async (req, res, next) => {
	try {
		// call bd name
		const db = getAsmatDb();
		// get id
		const id = req.params.id;
		// get update data from body
		const updateData = req.body;
		// position number comes from body is string, convert it to number type
		const upPositionNum = parseInt(updateData.position);
		// get position result from database
		const dbPosition = await db
			.collection('gov_body')
			.findOne(
				{ _id: ObjectId(id) },
				{ projection: { position: true, _id: false } }
			);
		const dbPositionNum = dbPosition.position;

		if (dbPositionNum === upPositionNum) {
			const result = await db
				.collection('gov_body')
				.updateOne(
					{ _id: ObjectId(id) },
					{ $set: { ...updateData, position: upPositionNum } }
				);
			res.send(result);
		} else if (dbPositionNum > upPositionNum) {
			// update position in every document greater then update position
			const updatePositionAll = await db
				.collection('gov_body')
				.updateMany(
					{ position: { $gte: upPositionNum, $lte: dbPositionNum } },
					{ $inc: { position: 1 } }
				);
			if (updatePositionAll.modifiedCount > 0) {
				const result = await db
					.collection('gov_body')
					.updateOne(
						{ _id: ObjectId(id) },
						{ $set: { ...updateData, position: upPositionNum } }
					);
				res.send(result);
			}
			res.send('sorry not updated');
		} else {
			// update position in every document greater then update position
			const updatePositionAll = await db
				.collection('gov_body')
				.updateMany(
					{ position: { $gte: dbPositionNum, $lte: upPositionNum } },
					{ $inc: { position: -1 } }
				);
			if (updatePositionAll.modifiedCount > 0) {
				const result = await db
					.collection('gov_body')
					.updateOne(
						{ _id: ObjectId(id) },
						{ $set: { ...updateData, position: upPositionNum } }
					);
				res.send(result);
			}
			res.send('sorry not updated');
		}
	} catch (error) {
		next(error);
	}
};
