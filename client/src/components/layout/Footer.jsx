import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter } from 'lucide-react';
import { useData } from '../../context/DataContext';

const Footer = () => {
    const { data } = useData();
    const { hero } = data;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const socialIcons = {
        Github: <Github size={20} />,
        Linkedin: <Linkedin size={20} />,
        Twitter: <Twitter size={20} />
    };

    return (
        <footer className="py-20 bg-slate-900 text-white relative z-10">
            <div className="container-custom flex flex-col md:flex-row justify-between items-center">
                <div className="mb-8 md:mb-0 text-center md:text-left">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-mono">Fog season HVAC</span>
                    <p className="text-gray-600 text-sm mt-3">
                        Engineering Excellence Delivered. <br />
                        © {new Date().getFullYear()} Fog season HVAC. All rights reserved.
                    </p>
                </div>

                <div className="flex space-x-6 mb-8 md:mb-0">
                    {hero.socials.map((social, idx) => (
                        <a
                            key={idx}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-primary transition-all hover:scale-110 transform"
                        >
                            {socialIcons[social.icon] || social.platform}
                        </a>
                    ))}
                </div>

                <button
                    onClick={scrollToTop}
                    className="p-4 bg-white hover:bg-primary hover:text-white rounded-full transition-all duration-300 text-slate-800 shadow-md hover:shadow-primary/50 group"
                    aria-label="Back to top"
                >
                    <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
                </button>
            </div>
        </footer>
    );
};

export default Footer;
