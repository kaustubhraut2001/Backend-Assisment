const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB database');
    } catch (error) {
        console.error('Failed to connect to MongoDB database:', error);
        process.exit(1);
    }
};

module.exports = connectDB;