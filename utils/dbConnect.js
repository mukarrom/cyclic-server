const { MongoClient, ServerApiVersion } = require('mongodb');

const connectionString = process.env.MONGO_URI;
const client = new MongoClient(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

let asmatCollageDB;
module.exports = {
	connectToServer: function (callback) {
		client.connect(function (err, db) {
			if (err || !db) {
				return callback(err);
			}
			asmatCollageDB = db.db('asmat_college');
			console.log('successfully connected database');
			return callback();
		});
	},
	getAsmatDb: function () {
		return asmatCollageDB;
	},
};
