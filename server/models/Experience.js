const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    role: { type: String, required: true },
    company: { type: String, required: true },
    period: { type: String },
    description: { type: String }
});

module.exports = mongoose.model('Experience', experienceSchema);
