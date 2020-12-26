const express = require('express');
const router = express.Router();

const lpController = require('../controllers/lotterPlayController');

/* GET users listing. */
router.get('/', lpController.lotteryplay);
router.get('/maxid', lpController.getmaxid);

module.exports = router;
