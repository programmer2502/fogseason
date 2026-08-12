const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const compression = require('compression');

const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const { warmPublicDataCache } = require('./controllers/contentController');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable gzip/deflate compression for all routes
app.use(compression());

// 1. Immediate Port Binding to satisfy platform health checks
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is listening on 0.0.0.0:${PORT}`);
    console.log(`📅 Started at: ${new Date().toISOString()}`);
    startSelfPing();
});

// 2. Comprehensive CORS (Relaxed for debugging)
app.use(cors({
    origin: '*',
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

// 7. MongoDB Connection (Non-blocking with idle recycle, timeout, and pool configuration)
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000, // Timeout early if DB is down (fail fast)
    maxIdleTimeMS: 30000,          // Recycle idle connections every 30s to prevent stale sockets
    socketTimeoutMS: 45000,        // Close socket if inactive for 45s
    maxPoolSize: 10,               // Standard pool size limit
    minPoolSize: 2                 // Keep at least 2 connections alive
})
    .then(() => {
        console.log('✅ MongoDB connected successfully');
        warmPublicDataCache();
    })
    .catch(err => {
        console.error('❌ MongoDB Connection Failure:');
        console.error(err.message);
    });

// Keep-awake self-ping mechanism to prevent Render spin-down
const https = require('https');
const http = require('http');

const startSelfPing = () => {
    const url = process.env.RENDER_EXTERNAL_URL;
    if (!url) {
        console.log('ℹ️ RENDER_EXTERNAL_URL is not set. Self-ping keep-awake task is disabled (normal for local development).');
        return;
    }

    console.log(`📡 Initializing self-ping keep-awake for URL: ${url}`);
    
    // Ping every 14 minutes to prevent Render free-tier sleep (15 min timeout)
    setInterval(() => {
        const client = url.startsWith('https') ? https : http;
        client.get(`${url}/api/health`, (res) => {
            console.log(`📡 Keep-awake self-ping status code: ${res.statusCode}`);
        }).on('error', (err) => {
            console.error('❌ Keep-awake self-ping failed:', err.message);
        });
    }, 14 * 60 * 1000);
};
