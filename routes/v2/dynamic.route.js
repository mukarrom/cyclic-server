const express = require('express');
const dynamicController = require('../../controllers/dynamic.controller');
// const verifyJWT = require('../../middleware/verifyJWT');

const router = express.Router();

router.route('/').get(dynamicController.getAllBodyF2L);
// router.route('/gbody').post(dynamicController.saveGovBody);

module.exports = router;
