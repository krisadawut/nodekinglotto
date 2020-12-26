const express = require('express');
const router = express.Router();

const payrateController = require('../controllers/payrateController');

/* GET users listing. */
router.get('/', payrateController.index);
// router.get('/maxid', payrateController.getmaxid);
router.post('/inst', payrateController.insert);
router.post('/mpidck', payrateController.mpidck);
router.post('/upd', payrateController.update);

module.exports = router;