const express = require('express');
const router = express.Router();

const mbTypeController = require('../controllers/memberTypeController');

/* GET users listing. */
router.get('/', mbTypeController.index);
router.get('/maxid', mbTypeController.getmaxid);
router.get('/ddl', mbTypeController.ddlmembertype);
router.post('/inst', mbTypeController.insert);
router.get('/upd', mbTypeController.update);
router.put('/del', mbTypeController.destroy);

module.exports = router;