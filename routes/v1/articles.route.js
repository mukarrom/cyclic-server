const express = require('express');
const articlesController = require('../../controllers/articles.controller');
// const verifyJWT = require('../../middleware/verifyJWT');

const router = express.Router();

router
	.route('/')
	// get data
	.get(articlesController.getArticles)
	// post data
	.post(articlesController.updateArticles)
	// update data
	.put()
	// delete data
	.delete();

module.exports = router;
