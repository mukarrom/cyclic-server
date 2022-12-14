const express = require('express');
const blogsController = require('../../controllers/blogs.controller');
// const verifyJWT = require('../../middleware/verifyJWT');

const router = express.Router();

router
	.route('/')
	.get(blogsController.getAllBlogs)
	.post(blogsController.saveABlog);

router
	.route('/:id')
	.get(blogsController.getABlog)
	.put(blogsController.updateABlog)
	.delete(blogsController.deleteABlog);

/**
	 * upload new blog or update existing blog
	 * method put
	 * data structure : { category: e.category,
                        heading: e.heading,
                        image: img,
                        article: content,
                        posterEmail: user.email,
                        postedTime: new Date().toLocaleString('in')}
	 */

/**
	 * upload new blog or update existing blog
	 * method put
	 * data structure : { category: e.category,
                        heading: e.heading,
                        image: img,
                        article: content,
                        posterEmail: user.email,
                        postedTime: new Date().toLocaleString('in')}
	 */

module.exports = router;
