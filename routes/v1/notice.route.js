const express = require('express');
const noticeController = require('../../controllers/notice.controller');

const router = express.Router();

router
	.route('/')
	.post(noticeController.saveANotice)
	.get(noticeController.getAllNotice);

router
	.route('/:id')
	.get(noticeController.getANotice)
	.put(noticeController.updateANotice)
	.delete(noticeController.deleteANotice);

module.exports = router;
