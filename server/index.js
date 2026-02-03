const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', contentRoutes);
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error('------------------------------------------------');
        console.error('❌ MongoDB Connection Error:', err.message);
        console.error('------------------------------------------------');
        console.error('It looks like MongoDB is not running or not matching the URI.');
        console.error('Current URI:', process.env.MONGO_URI);
        console.error('To fix this:');
        console.error('1. Make sure MongoDB is installed and running.');
        console.error('2. Check if the URI in .env file is correct.');
        console.error('------------------------------------------------');
    });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
