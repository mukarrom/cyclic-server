const { MongoClient } = require('mongodb');
const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const uri = process.env.MONGO_CONNECTION_STRING;
const client = new MongoClient(uri);

app.get('/users', async (req, res) => {
	let item = await client
		.db('sample_mflix')
		.collection('users')
		.find()
		.toArray();

	res.send(item);
});

client.connect(err => {
	if (err) {
		console.error(err);
		return false;
	}
	// connection to mongo is successful, listen for requests
	app.listen(PORT, () => {
		console.log('listening for requests');
	});
});
