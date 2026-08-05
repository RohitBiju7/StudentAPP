const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

require('dotenv').config();

const mongoose = require('mongoose');
const Student = require('./models/userModel');
const userRoutes = require('./routes/userRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const db = require('./connection');

// Connect to MongoDB
db();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Student API routes
app.use('/students', userRoutes);
app.use('/feedback', feedbackRoutes);

app.get('/db-debug', async (req, res) => {
    try {
        const connection = mongoose.connection;
        const count = await Student.countDocuments();
        const docs = await Student.find().select('rollno email candidate_name course marks');
        return res.status(200).json({
            readyState: connection.readyState,
            dbName: connection.name || connection.db?.databaseName,
            modelCollection: Student.collection.name,
            count,
            docs,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});