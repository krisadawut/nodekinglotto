const express = require('express');
const router = express.Router();

const pldtController = require('../controllers/playDetailController');

/* GET play detail listing. */
router.get('/', pldtController.index);
router.post('/inst', pldtController.insert);
router.post('/mpidck', pldtController.mpidck);
router.post('/upd', pldtController.update);

module.exports = router;