const express = require('express');
const {scrapeItemDetails} = require('../controllers/scrapeItemDetails');

const router = express.Router();

// call sceapeItemDetails Controller
router.post('/', scrapeItemDetails);

module.exports = router;
