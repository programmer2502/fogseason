const SiteConfig = require('../models/SiteConfig');
const Project = require('../models/Project');
const Service = require('../models/Service');
const Experience = require('../models/Experience');

// Helper to ensure SiteConfig exists
const getSiteConfig = async () => {
    let config = await SiteConfig.findOne();
    if (!config) {
        config = await SiteConfig.create({
            hero: {},
            about: {},
            contact: {},
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
            ]
        });
    } else if (!config.whatWeDo || config.whatWeDo.length === 0) {
        config.whatWeDo = [
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
        ];
        await config.save();
    }
    return config;
};

// --- PUBLIC ---

exports.getPublicData = async (req, res) => {
    try {
        const config = await getSiteConfig();
        const projects = await Project.find().sort({ createdAt: -1 });
        const services = await Service.find();
        const experience = await Experience.find();

        // Construct the exact object structure the frontend expects
        const data = {
            hero: config.hero,
            about: config.about,
            whatWeDo: config.whatWeDo,
            contact: config.contact,
            projects: projects,
            services: services,
            experience: experience
        };

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- ADMIN ---

// Section Updates (Hero, About, Contact)
exports.updateSection = async (req, res) => {
    const { section } = req.params; // 'hero', 'about', 'contact', 'whatWeDo'
    const content = req.body;

    // Validate section name
    if (!['hero', 'about', 'contact', 'whatWeDo'].includes(section)) {
        return res.status(400).json({ message: 'Invalid section' });
    }

    try {
        let config = await getSiteConfig();
        config[section] = content;
        await config.save();
        res.json(config[section]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Generic CRUD implementations for collections
const getModel = (collectionName) => {
    switch (collectionName) {
        case 'projects': return Project;
        case 'services': return Service;
        case 'experience': return Experience;
        default: return null;
    }
};

exports.addToCollection = async (req, res) => {
    const { collection } = req.params;
    const Model = getModel(collection);

    if (!Model) return res.status(400).json({ message: 'Invalid collection' });

    try {
        const newItem = await Model.create(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCollectionItem = async (req, res) => {
    const { collection, id } = req.params;
    const Model = getModel(collection);

    if (!Model) return res.status(400).json({ message: 'Invalid collection' });

    try {
        const updatedItem = await Model.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCollectionItem = async (req, res) => {
    const { collection, id } = req.params;
    const Model = getModel(collection);

    if (!Model) return res.status(400).json({ message: 'Invalid collection' });

    try {
        const deletedItem = await Model.findByIdAndDelete(id);
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
