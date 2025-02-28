require('dotenv').config();

const express = require('express');
const router = express.Router();
const employeeRoutes = require("./routes/employeeRoutes");

// Services
const productServices = require('./routes/inventory-route');
const posServices = require('./routes/pos-routes');
const authService = require('./routes/auth-routes');

// Request mapper
const mapper = '/api/v1';

// Init app
const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Define routes
app.use(`${mapper}/inventory`, productServices);
app.use(`${mapper}/pos`, posServices);
app.use(`${mapper}/auth`, authService);
app.use("/api", employeeRoutes); // Add employee routes

// If no request matches
app.use((req, res) => {
    res.status(404).json({ error: 'No such endpoint exists' });
});

// Start the server only once
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`ESB running on port ${PORT}`);
});
