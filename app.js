const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/routes');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/', route);

// Static routes
app.use('/public', express.static(__dirname + '/public'));

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});