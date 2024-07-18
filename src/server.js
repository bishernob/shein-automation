const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.log(`Error : ${err.message}`);
    res.status(500).send('Internal Server Error');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

