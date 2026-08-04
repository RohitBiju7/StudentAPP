const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = require('../models/userModel');

// Register a new student (persist to MongoDB)
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

        if (student.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        return res.status(200).json({
            message: 'Login successful',
            student: {
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

// view student by rollno
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


// update student by rollno
router.put('/:rollno', async (req, res) => {
    try {
        const rollno = parseInt(req.params.rollno);
        if (isNaN(rollno)) {
            return res.status(400).json({ message: 'Invalid roll number format' });
        }

        const updates = req.body;
        const options = { new: true, runValidators: true };
        const updated = await Student.findOneAndUpdate({ rollno }, updates, options);

        if (!updated) return res.status(404).json({ message: 'Student not found' });

        return res.status(200).json({ message: 'Student updated successfully', student: updated });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


//Delete student
router.delete('/:rollno', async (req, res) => {
    try {
        const rollno = parseInt(req.params.rollno);
        const deleted = await Student.findOneAndDelete({ rollno });
        if (!deleted) return res.status(404).json({ message: 'Student not found' });

        const totalStudents = await Student.countDocuments();
        return res.status(200).json({ message: 'Student deleted successfully', totalStudents });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});




module.exports = router;