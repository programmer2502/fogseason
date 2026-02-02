const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    icon: { type: String, required: true }, // Store icon name string from Lucide
    description: { type: String }
});

module.exports = mongoose.model('Service', serviceSchema);
