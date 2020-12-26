const express = require('express');
const router = express.Router();

const ltTypeController = require('../controllers/lotteryTypeController');

/* GET users listing. */
router.get('/', ltTypeController.index);
router.get('/maxid', ltTypeController.getmaxid);
router.get('/lttype', ltTypeController.getlotterytype);
router.post('/inst', ltTypeController.insert);
router.get('/upd', ltTypeController.update);
router.put('/del', ltTypeController.destroy);

module.exports = router;