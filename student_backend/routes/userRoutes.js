const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Register a new student
router.post('/register', async (req, res) => {
    try {
        const { rollno, candidate_name, course, email, marks, password } = req.body;

        if (rollno === undefined || rollno === null || rollno === '') {
            return res.status(400).json({ message: 'Roll number cannot be empty' });
        }

        if (!candidate_name || candidate_name.trim() === '') {
            return res.status(400).json({ message: 'Name cannot be empty' });
        }

        if (course === undefined || course === null || course === '') {
            return res.status(400).json({ message: 'Course cannot be empty' });
        }

        if (!email || !email.includes('@')) {
            return res.status(400).json({ message: 'Email must include @' });
        }

        if (typeof marks !== 'number' || marks < 0 || marks > 100) {
            return res.status(400).json({ message: 'Marks must be a valid number between 0 and 100' });
        }

        if (!password || typeof password !== 'string' || password.trim() === '') {
            return res.status(400).json({ message: 'Password cannot be empty' });
        }

        // Check for existing rollno or email
        const existing = await Student.findOne({ $or: [{ rollno }, { email }] });
        if (existing) {
            return res.status(400).json({ message: 'Roll number or email already exists' });
        }

        const student = new Student({ rollno, candidate_name, course, email, marks, password });
        await student.save();

        const totalStudents = await Student.countDocuments();

        return res.status(201).json({ message: 'Student registered successfully!', totalStudents });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Login with email and password
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return res.status(400).json({ message: 'A valid email is required' });
        }

        if (!password || typeof password !== 'string' || password.trim() === '') {
            return res.status(400).json({ message: 'Password is required' });
        }

        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare password using bcrypt
        const isPasswordValid = await student.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Safe payload (NEVER put raw passwords inside JWTs)
        const payload = { id: student._id, email: student.email };
        
        // Generate JWT token
        const token = jwt.sign(payload, process.env.JWT_SECRET || "secret", { expiresIn: '1d' });

        // Single response output
        return res.status(200).json({
            message: 'Login successful',
            token: token,
            student: {
                id: student._id,
                rollno: student.rollno,
                candidate_name: student.candidate_name,
                email: student.email,
                course: student.course,
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// View all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        return res.status(200).json(students);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Debug endpoint for active DB info
router.get('/debug/connection', async (req, res) => {
    try {
        const connection = mongoose.connection;
        const count = await Student.countDocuments();
        return res.status(200).json({
            readyState: connection.readyState,
            dbName: connection.name || connection.db?.databaseName,
            modelCollection: Student.collection.name,
            count,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Check student count
router.get('/count', async (req, res) => {
    try {
        const count = await Student.countDocuments();
        return res.status(200).json({ count });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// View student by rollno
router.get('/:rollno', async (req, res) => {
    try {
        const rollno = parseInt(req.params.rollno);
        if (isNaN(rollno)) {
            return res.status(400).json({ message: 'Invalid roll number format' });
        }

        const student = await Student.findOne({ rollno });
        if (!student) return res.status(404).json({ message: 'Student not found' });

        return res.status(200).json(student);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Update student by id
router.put('/:id', async (req, res) => {
    try {
        const updates = req.body;
        const options = { new: true, runValidators: true };
        const updated = await Student.findByIdAndUpdate(req.params.id, updates, options);

        if (!updated) return res.status(404).json({ message: 'Student not found' });

        return res.status(200).json({ message: 'Student updated successfully', student: updated });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Delete student by id
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Student.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Student not found' });

        const totalStudents = await Student.countDocuments();
        return res.status(200).json({ message: 'Student deleted successfully', totalStudents });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;