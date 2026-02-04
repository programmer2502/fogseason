const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Project = require('./models/Project');
const Service = require('./models/Service');
const Experience = require('./models/Experience');
const SiteConfig = require('./models/SiteConfig');

dotenv.config();

const initialData = {
    hero: {
        name: "FOG SEASON HVAC",
        title: "Heating | Ventilation | Air Conditioning",
        tagline: "Your Comfort, Our Priority - All Seasons Round",
        cta: [
            { label: "Our Projects", link: "#projects", primary: true },
            { label: "Contact Us", link: "#contact", primary: false }
        ],
        socials: [
            { platform: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
            { platform: "Twitter", url: "https://twitter.com", icon: "Twitter" },
            { platform: "Facebook", url: "https://facebook.com", icon: "Globe" }
        ]
    },
    about: {
        bio: "We are Fog season HVAC, a premier contracting company dedicated to delivering state-of-the-art Heating, Ventilation, and Air Conditioning solutions. With over a decade of excellence, we specialize in large-scale commercial, residential, and industrial projects, ensuring efficiency, comfort, and sustainability in every build.",
        skills: [
            { name: "HVAC Systems", level: 95 },
            { name: "Electrical Power", level: 90 },
            { name: "Plumbing & Drainage", level: 92 },
            { name: "Fire Protection", level: 98 }
        ],
        image: "https://images.unsplash.com/photo-1581094794329-cd282c0f4448?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        experienceYears: 15,
        projectsCompleted: 200
    },
    services: [
        { title: "Air-conditioning (HVAC)", icon: "Snowflake" },
        { title: "AHU & Ducting Systems", icon: "Wind" },
        { title: "Car Park & Basement Ventilation", icon: "Fan" },
        { title: "DataCenters PAC Systems", icon: "Server" },
        { title: "Specialist Fire Suppression Systems", icon: "Droplets" },
        { title: "Chiller Plant Systems", icon: "ThermometerSnowflake" },
        { title: "Spot Cooling Systems", icon: "Wind" },
        { title: "CNC Process Exhaust Systems", icon: "Factory" },
        { title: "Clean Room AHU Ducting Systems", icon: "Shield" },
        { title: "Fire Protection & Fire Fighting", icon: "Shield" },
        { title: "VRF Systems", icon: "Cpu" },
        { title: "Process Cooling Systems", icon: "Activity" },
        { title: "Commercial Kitchen Ventilation Systems", icon: "ChefHat" },
        { title: "Hospital OT AHU Ducting Systems", icon: "HeartPulse" },
        { title: "Fire Alarm System", icon: "Bell" }
    ],
    projects: [
    
    ],
    experience: [
        {
            role: "Company Inception",
            company: "Fog Season HVAC",
            period: "March 2024",
            description: "We registered our company and commenced operations at Bangalore, Karnataka."
        },
        {
            role: "Chennai Branch Expansion",
            company: "Tamilnadu Operations",
            period: "Jan 2026",
            description: "We extended the boundaries to Tamilnadu and registered the new branch in Chennai."
        }
    ],
    whatWeDo: [
        {
            title: "Design and Engineering",
            description: "Include any necessary calculations, selections, and schematic designs. Mention the creation of blueprints or digital models if applicable.",
            icon: "PenTool"
        },
        {
            title: "Procurement",
            description: "Describe the process for acquiring HVAC units and components, including timelines and supplier details.",
            icon: "ShoppingCart"
        },
        {
            title: "Installation",
            description: "Outline the steps for installing the equipment, from site preparation to testing and commissioning.",
            icon: "Wrench"
        },
        {
            title: "Commissioning and Testing",
            description: "Specify procedures for ensuring that installed systems meet design specifications and operational requirements.",
            icon: "ClipboardCheck"
        },
        {
            title: "Annual Maintenance Contracts",
            description: "This includes tasks like cleaning, inspecting, and replacing parts to keep your system running efficiently. AMCs help prevent breakdowns, extend the lifespan of your equipment, and potentially lower energy costs.",
            icon: "CalendarCheck"
        }
    ],
    contact: {
        email: "info@fogseasonhvac.com",
        phone: "+91 78688 06841",
        headOffice: "#27, Sanjeevappa Layout, Thilgara beedi, varthur near Marathahalli, Bangalore - 560087",
        branchOffice: "No- 21/77, Kamaraj nagar, Madhuraboyal, Chennai - 600095",
        socials: [
            { platform: "LinkedIn", url: "https://linkedin.com" },
            { platform: "Twitter", url: "https://twitter.com" }
        ]
    }
};

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await User.deleteMany();
        await Project.deleteMany();
        await Service.deleteMany();
        await Experience.deleteMany();
        await SiteConfig.deleteMany();

        // Create Admin User
        await User.create({
            username: 'admin',
            password: 'admin123'
        });

        // Create Collections
        await Project.insertMany(initialData.projects);
        await Service.insertMany(initialData.services);
        await Experience.insertMany(initialData.experience);

        // Create Config
        await SiteConfig.create({
            hero: initialData.hero,
            about: initialData.about,
            contact: initialData.contact
        });

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error('------------------------------------------------');
        console.error('❌ MongoDB Connection Error:', error.message);
        console.error('------------------------------------------------');
        console.error('It looks like MongoDB is not running or not matching the URI.');
        console.error('Current URI:', process.env.MONGO_URI);
        process.exit(1);
    }
};

importData();
