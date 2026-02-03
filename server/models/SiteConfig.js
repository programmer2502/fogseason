const mongoose = require('mongoose');

const ctaSchema = new mongoose.Schema({
    label: String,
    link: String,
    primary: Boolean
});

const socialSchema = new mongoose.Schema({
    platform: String,
    url: String,
    icon: String
});

const skillSchema = new mongoose.Schema({
    name: String,
    level: Number
});

const whatWeDoSchema = new mongoose.Schema({
    title: String,
    description: String,
    icon: String
});

const siteConfigSchema = new mongoose.Schema({
    hero: {
        name: String,
        title: String,
        tagline: String,
        cta: [ctaSchema],
        socials: [socialSchema]
    },
    about: {
        bio: String,
        skills: [skillSchema],
        image: String,
        experienceYears: Number,
        projectsCompleted: Number
    },
    whatWeDo: [whatWeDoSchema],
    contact: {
        email: String,
        phone: String,
        headOffice: String,
        branchOffice: String,
        socials: [socialSchema]
    }
}, { timestamps: true });

module.exports = mongoose.model('SiteConfig', siteConfigSchema);
