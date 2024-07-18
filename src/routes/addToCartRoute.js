const express = require('express');
const { addToCart } = require('../controllers/addToCart');

const router = express.Router();

// call addTocart Controller
router.post('/', addToCart);

module.exports = router;
