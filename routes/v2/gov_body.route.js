const express = require('express');
const govBodyController = require('../../controllers/gov_body.controller');
const verifyJWT = require('../../middleware/verifyJWT');

const router = express.Router();

router.route('/').post(verifyJWT, govBodyController.saveGovBody);
router.route('/:id').put(verifyJWT, govBodyController.updateGovBody);

module.exports = router;
