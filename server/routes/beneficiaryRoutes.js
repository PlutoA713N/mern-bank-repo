const express = require('express');
const router = express.Router();
const { addNewCustomer } = require('../controllers/beneficiaryController');

router.post('/api/beneficiary', addNewCustomer);

module.exports = router;
