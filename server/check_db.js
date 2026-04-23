const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');
const Gallery = require('./models/Gallery');

dotenv.config();

const checkData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const projects = await Project.find();
        const gallery = await Gallery.find();
        console.log('Projects count:', projects.length);
        console.log('Gallery count:', gallery.length);
        console.log('Projects:', JSON.stringify(projects, null, 2));
        console.log('Gallery:', JSON.stringify(gallery, null, 2));
        process.exit();
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

checkData();
