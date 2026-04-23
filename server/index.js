const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
    'https://www.fogseason.in',
    'https://fogseason.in',
    'http://localhost:5173',
    'http://localhost:3000'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('railway.app')) {
            callback(null, true);
        } else {
            console.log('Blocked Origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// 3. Request Logging for Platform Logs
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// 4. Primary & Health Check Routes
app.get('/', (req, res) => res.status(200).send('FogSeason Backend API is running!'));
app.get('/api/health', (req, res) => res.status(200).json({
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'connecting/disconnected',
    time: new Date()
}));

// 5. API Routes
app.use('/api/auth', authRoutes);
app.use('/api', contentRoutes);
app.use('/api/upload', uploadRoutes);

// 6. Global Error Handler
app.use((err, req, res, next) => {
    console.error('❌ Server Internal Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: err.message
    });
});

// 7. MongoDB Connection (Non-blocking with short timeout)
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000 // Timeout early if DB is down
})
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch(err => {
        console.error('❌ MongoDB Connection Failure:');
        console.error(err.message);
    });

// 8. Server Listen
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is listening on 0.0.0.0:${PORT}`);
    console.log(`📅 Started at: ${new Date().toISOString()}`);
});
