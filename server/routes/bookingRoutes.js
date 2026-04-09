const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'bookings.json');

// Helper: read bookings from file
function readBookings() {
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

// Helper: write bookings to file
function writeBookings(bookings) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2));
}

// POST /api/bookings — create a new booking
router.post('/', (req, res) => {
    const { name, email, phone, destination, checkIn, checkOut, guests, requests } = req.body;

    // Validation
    const errors = [];
    if (!name || name.trim().length < 2) errors.push('Name is required (min 2 characters).');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required.');
    if (!destination) errors.push('Please select a destination.');
    if (!checkIn) errors.push('Check-in date is required.');
    if (!checkOut) errors.push('Check-out date is required.');
    if (checkIn && checkOut && new Date(checkIn) >= new Date(checkOut)) {
        errors.push('Check-out date must be after check-in date.');
    }
    if (!guests || guests < 1 || guests > 20) errors.push('Group size must be between 1 and 20.');

    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }

    const booking = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : '',
        destination,
        checkIn,
        checkOut,
        guests: parseInt(guests),
        requests: requests ? requests.trim() : '',
        createdAt: new Date().toISOString()
    };

    const bookings = readBookings();
    bookings.push(booking);
    writeBookings(bookings);

    res.status(201).json({
        success: true,
        message: 'Booking confirmed! We will contact you shortly with details.',
        booking: { id: booking.id, destination: booking.destination, checkIn: booking.checkIn }
    });
});

// GET /api/bookings — list all bookings
router.get('/', (req, res) => {
    const bookings = readBookings();
    res.json({ success: true, count: bookings.length, bookings });
});

module.exports = router;
