const express = require('express');
const router = express.Router();
const addToCart = require('./addToCartRoute');
const scrapeItemDetails = require('./scrapeItemDetailsRoute');

// Serve the admin panel
router.get('/', (req, res) => {
    res.sendFile('admin_panel.html');
});

// Add to cart routes
router.use('/add-to-cart', addToCart);

// Fetch item details routes
router.use('/fetch-item-details', scrapeItemDetails);

module.exports = router;
