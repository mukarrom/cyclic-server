const express = require('express');
const cors = require('cors');
// const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const errorHandler = require('./middleware/errorHandler');
const usersRoutes = require('./routes/v1/users.route');
const blogsRoutes = require('./routes/v1/blogs.route');
const eventsRoutes = require('./routes/v1/events.route');
// const testRoutes = require('./routes/v1/test.route');
const articlesRoutes = require('./routes/v1/articles.route');
const noticeRoutes = require('./routes/v1/notice.route');
// const dynamicRoutes = require('./routes/v1/dynamic.route');
const { connectToServer } = require('./utils/dbConnect');
const dynamicRoutes = require('./routes/v1/dynamic.route');

app.use(cors());
app.use(express.json());

// const uri = process.env.MONGO_URI;
// const client = new MongoClient(uri, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	serverApi: ServerApiVersion.v1,
// });

connectToServer((err) => {
	if (!err) {
		app.listen(port, () => {
			console.log(`Example app listening on port ${port}`);
		});
	} else {
		console.log(err);
	}
});

// Routes

// app.use('/api/v1/test', testRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/notice', noticeRoutes);
app.use('/api/v1/blogs', blogsRoutes);
app.use('/api/v1/events', eventsRoutes);
app.use('/api/v1/articles', articlesRoutes);
app.use('/api/v1/dynamic', dynamicRoutes);

app.get('/', (req, res) => {
	res.send('home');
});

app.all('*', (req, res) => {
	res.send('NO route found.');
});

app.use(errorHandler);

process.on('unhandledRejection', (error) => {
	console.log(error.name, error.message);
	app.close(() => {
		process.exit(1);
	});
});
