const express = require('express');
const router = express.Router();

const authController = require('../controllers/authenticateController');

/* GET users listing. */
router.get('/', authController.index);

module.exports = router;
