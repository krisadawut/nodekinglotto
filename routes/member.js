const express = require('express');
const router = express.Router();

const mbController = require('../controllers/memberController');

/* GET users listing. */
router.get('/', mbController.index);

module.exports = router;
