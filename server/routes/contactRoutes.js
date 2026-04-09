const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'messages.json');

// Helper: read messages from file
function readMessages() {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
        }
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

// Helper: write messages to file
function writeMessages(messages) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2));
}

// POST /api/contact — submit a contact message
router.post('/', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validation
    const errors = [];
    if (!name || name.trim().length < 2) errors.push('Name is required (min 2 characters).');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required.');
    if (!subject || subject.trim().length < 3) errors.push('Subject is required (min 3 characters).');
    if (!message || message.trim().length < 10) errors.push('Message must be at least 10 characters.');

    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }

    const contactMessage = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
        createdAt: new Date().toISOString()
    };

    const messages = readMessages();
    messages.push(contactMessage);
    writeMessages(messages);

    res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been received. We\'ll get back to you within 24 hours.'
    });
});

// GET /api/contact — list all messages
router.get('/', (req, res) => {
    const messages = readMessages();
    res.json({ success: true, count: messages.length, messages });
});

module.exports = router;
