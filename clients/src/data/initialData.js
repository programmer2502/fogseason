export const initialData = {
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
            { platform: "Facebook", url: "https://facebook.com", icon: "Globe" } // Using Globe as generic web icon
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
        image: "https://images.unsplash.com/photo-1581094794329-cd282c0f4448?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Industrial/Engineering image
        experienceYears: 15,
        projectsCompleted: 200
    },
    services: [
        { id: 1, title: "Air-conditioning (HVAC)", icon: "Snowflake" },
        { id: 2, title: "AHU & Ducting Systems", icon: "Wind" },
        { id: 3, title: "Car Park & Basement Ventilation", icon: "Fan" },
        { id: 4, title: "DataCenters PAC Systems", icon: "Server" },
        { id: 5, title: "Specialist Fire Suppression Systems", icon: "Droplets" },
        { id: 6, title: "Chiller Plant Systems", icon: "ThermometerSnowflake" },
        { id: 7, title: "Spot Cooling Systems", icon: "Wind" },
        { id: 8, title: "CNC Process Exhaust Systems", icon: "Factory" },
        { id: 9, title: "Clean Room AHU Ducting Systems", icon: "Shield" },
        { id: 10, title: "Fire Protection & Fire Fighting", icon: "Shield" },
        { id: 11, title: "VRF Systems", icon: "Cpu" },
        { id: 12, title: "Process Cooling Systems", icon: "Activity" },
        { id: 13, title: "Commercial Kitchen Ventilation Systems", icon: "ChefHat" },
        { id: 14, title: "Hospital OT AHU Ducting Systems", icon: "HeartPulse" },
        { id: 15, title: "Fire Alarm System", icon: "Bell" }
    ],
    projects: [
        {
            id: 1,
            title: "Skyline Tower",
            description: "Full MEP execution for a 50-story commercial skyscraper in downtown.",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            images: [
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1479839672679-a46483c0e7c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1435686025229-aa445249715b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            ],
            tags: ["HVAC", "Electrical", "BMS"],
            github: "#", // Could be project details link
            demo: "#",
            category: "Commercial"
        },
        {
            id: 2,
            title: "City General Hospital",
            description: "Specialized medical gas systems and clean room HVAC for a 500-bed hospital.",
            image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            images: [
                "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1538108149393-fbbd8189718c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1504813184591-01572f98c85f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            ],
            tags: ["Medical Gas", "HVAC", "Safety"],
            github: "#",
            demo: "#",
            category: "Healthcare"
        },
        {
            id: 3,
            title: "Green Valley Resort",
            description: "Sustainable energy solutions and water recycling systems for an eco-resort.",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            images: [
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            ],
            tags: ["Plumbing", "Solar", "Green"],
            github: "#",
            demo: "#",
            category: "Hospitality"
        }
    ],
    experience: [
        {
            id: 1,
            role: "Company Inception",
            company: "Fog Season HVAC",
            period: "March 2024",
            description: "We registered our company and commenced operations at Bangalore, Karnataka."
        },
        {
            id: 2,
            role: "Chennai Branch Expansion",
            company: "Tamilnadu Operations",
            period: "Jan 2026",
            description: "We extended the boundaries to Tamilnadu and registered the new branch in Chennai."
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
