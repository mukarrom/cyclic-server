const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 3001;

const uri =
	'mongodb+srv://mmh_admin:mmh12345@cluster0.g7jeb4r.mongodb.net/?retryWrites=true&w=majority';
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
