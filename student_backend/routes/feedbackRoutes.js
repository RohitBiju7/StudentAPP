const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedbackModel');

router.post('/submit', async (req, res) => {
    try {
        const { email, course, feedback } = req.body;

        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return res.status(400).json({ message: 'A valid email is required' });
        }

        if (!course || typeof course !== 'string' || course.trim() === '') {
            return res.status(400).json({ message: 'Course is required' });
        }

        if (!feedback || typeof feedback !== 'string' || feedback.trim() === '') {
            return res.status(400).json({ message: 'Feedback cannot be empty' });
        }

        const feedbackDoc = new Feedback({ email, course, feedback });
        await feedbackDoc.save();

        return res.status(201).json({ message: 'Feedback submitted successfully', feedbackId: feedbackDoc._id });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const feedbackList = await Feedback.find().sort({ createdAt: -1 });
        return res.status(200).json(feedbackList);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;