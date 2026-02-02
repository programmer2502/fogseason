const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    images: [{ type: String }],
    tags: [{ type: String }],
    github: { type: String },
    demo: { type: String },
    category: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
