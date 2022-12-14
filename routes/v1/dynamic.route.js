const express = require('express');
const dynamicController = require('../../controllers/dynamic.controller');
// const verifyJWT = require('../../middleware/verifyJWT');

const router = express.Router();

router
	.route('/')
	.get(dynamicController.getAllData)
	.post(dynamicController.saveAData);

router.route('/first').get(dynamicController.getFirstData);
router.route('/last').get(dynamicController.getLastData);

router
	.route('/:id')
	.get(dynamicController.getAData)
	.put(dynamicController.updateAData)
	.delete(dynamicController.deleteAData);

// router.route('/').get(dynamicController.getADataFilterWithCategory);

// router.route('/z2a').get();
/**
	 * upload new Data or update existing Data
	 * method put
	 * data structure : { category: e.category,
                        heading: e.heading,
                        image: img,
                        article: content,
                        posterEmail: user.email,
                        postedTime: new Date().toLocaleString('in')}
	 */

/**
	 * upload new Data or update existing Data
	 * method put
	 * data structure : { category: e.category,
                        heading: e.heading,
                        image: img,
                        article: content,
                        posterEmail: user.email,
                        postedTime: new Date().toLocaleString('in')}
	 */

module.exports = router;
