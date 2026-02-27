const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

app.use(cors()); // Temporarily allow all for debugging 503
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date() }));
app.use('/api/auth', authRoutes);
app.use('/api', contentRoutes);
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch((err) => {
        console.error('❌ MongoDB Connection Error:', err.message);
        // Do not keep the error message in production logs usually, but here it helps
    });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
