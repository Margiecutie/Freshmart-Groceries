const express = require("express");
const axios = require("axios");
const router = express.Router();

// Load environment variables
require("dotenv").config();

const EMPLOYEE_SERVICE_URL = process.env.EMPLOYEE_SERVICE_URL || "http://localhost:8000/api/employees/";

// Route to get employees (ESB forwards request to Django)
router.get("/employees", async (req, res) => {
    try {
        const response = await axios.get(EMPLOYEE_SERVICE_URL);
        res.json(response.data); // Forward response back to client
    } catch (error) {
        console.error("Error connecting to Employee Service:", error.message);
        res.status(500).json({ error: "Employee Service unavailable" });
    }
});

// Route to create a new employee
router.post("/employees", async (req, res) => {
    try {
        const response = await axios.post(EMPLOYEE_SERVICE_URL, req.body);
        res.json(response.data);
    } catch (error) {
        console.error("Error creating employee:", error.message);
        res.status(500).json({ error: "Failed to create employee" });
    }
});

module.exports = router;
