const express = require('express');
const { getCryptoStats,getCryptoDeviation } = require('../controllers/cryptoCrontoller');

const router = express.Router();

router.get('/stats', getCryptoStats);
router.get('/deviation', getCryptoDeviation);

module.exports = router;
