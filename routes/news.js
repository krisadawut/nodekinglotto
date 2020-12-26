const express = require('express');
const router = express.Router();

const newsController = require('../controllers/newsController');

/* GET users listing. */
router.get('/', newsController.index);
router.get('/maxid', newsController.getmaxid);
router.post('/inst', newsController.insert);
router.get('/upd', newsController.update);
router.put('/del', newsController.destroy);

module.exports = router;
