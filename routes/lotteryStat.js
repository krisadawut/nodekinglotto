const express = require('express');
const router = express.Router();

const ltStatController = require('../controllers/lotteryStatController');

/* GET users listing. */
router.get('/', ltStatController.index);
router.get('/maxid', ltStatController.getmaxid);
router.get('/period', ltStatController.getperiod);
router.get('/lttype', ltStatController.getlotterytype);
router.post('/inst', ltStatController.insert);
router.get('/upd', ltStatController.update);
router.put('/del', ltStatController.destroy);

module.exports = router;