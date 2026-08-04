const mongoose = require('mongoose');

const db = async () => {
    try {
        const uri = process.env.MONGO_URI;
        console.log('Connecting to MongoDB URI prefix:', uri ? uri.slice(0, 60) + '...' : 'undefined');
        await mongoose.connect(uri);
        console.log('MongoDB connected to', mongoose.connection.name);
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = db;