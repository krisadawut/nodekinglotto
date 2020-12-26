const express = require('express');
const router = express.Router();

const periodController = require('../controllers/periodController');

/* GET users listing. */
router.get('/', periodController.index);
router.get('/maxid', periodController.getmaxid);
router.get('/upd', periodController.update);
router.post('/inst', periodController.insert);
router.put('/del', periodController.destroy);

module.exports = router;
