const express = require('express');
const router = express.Router();
const imagekit = require('../utils/imagekit');

router.get('/auth', (req, res) => {
    try {
        if (!imagekit) {
            return res.status(503).json({ message: "ImageKit service not configured on backend" });
        }
        const result = imagekit.getAuthenticationParameters();
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Auth param generation failed" });
    }
});

module.exports = router;
