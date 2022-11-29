const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3001;

const uri = process.env.MONGO_CONNECTION_STRING;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

async function run() {
	try {
		await client.connect();
		const commentCollection = client.db('sample_mflix').collection('comments');

		app.get('/comments', async (req, res) => {
			const result = await commentCollection.find().toArray();
			res.send(result);
		});
	} finally {
	}
}
run().catch(console.dir);
app.get('/', (req, res) => res.type('html').send('hello'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
