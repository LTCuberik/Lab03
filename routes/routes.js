const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers');

router.get('/', controller.showHomePage);

module.exports = router;
