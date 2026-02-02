const express = require('express');
const router = express.Router();
const {
    getPublicData,
    updateSection,
    addToCollection,
    updateCollectionItem,
    deleteCollectionItem
} = require('../controllers/contentController');
const { protect } = require('../middleware/auth');

// Public Route
router.get('/public/data', getPublicData);

// Admin Routes
router.put('/sections/:section', protect, updateSection);
router.post('/collections/:collection', protect, addToCollection);
router.put('/collections/:collection/:id', protect, updateCollectionItem);
router.delete('/collections/:collection/:id', protect, deleteCollectionItem);

module.exports = router;
