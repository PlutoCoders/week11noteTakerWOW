const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');


const app = express();
const PORT = process.env.PORT || 3003;

// Adds middleware to parse incoming JSON data
app.use(express.json());
// Middleware to parse incoming url-encoded form data
app.use(express.urlencoded({ extended: true }));
// Middleware to serve static files from public folder (so that we don't need additional routing for ea file)
app.use(express.static('public'));
// Routes any request that starts with /api to the apiRoutes router
app.use('/api', apiRoutes);
// Routes all requests to the htmlRoutes router.
app.use('/', htmlRoutes);

// Need this to start the server (tells it which port to lsiten on, in this case its 3001 because thats what we set the variable to)
app.listen(PORT);
console.log('http:/',{PORT});