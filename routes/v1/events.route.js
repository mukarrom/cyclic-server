const express = require('express');
const eventsController = require('../../controllers/events.controller');
// const verifyJWT = require('../../middleware/verifyJWT');

const router = express.Router();

router
	.route('/')
	.get(eventsController.getAllEvents)
	.post(eventsController.saveAEvent);

router
	.route('/:id')
	.get(eventsController.getAEvent)
	.put(eventsController.updateAEvent)
	.delete(eventsController.deleteAEvent);

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
	 * upload new event or update existing blog
	 * method put
	 * data structure : { category: e.category,
                        heading: e.heading,
                        image: img,
                        article: content,
                        posterEmail: user.email,
                        postedTime: new Date().toLocaleString('in')}
	 */

module.exports = router;
