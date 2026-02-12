const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
const PORT = 8081;

// Middleware to parse JSON
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://mongodbcomzombie391_db_user:chJSeCe2WerMJ6Zf1Z@assignment1.aenlzmj.mongodb.net/lab4?appName=Assignment1');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

// POST API to create users
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ error: errors });
        }
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: 'Server validation error', details: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
