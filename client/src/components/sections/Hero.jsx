import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';
import { useData } from '../../context/DataContext';

const Hero = () => {
    const { data } = useData();
    const { hero } = data;

    const socialIcons = {
        Github: <Github size={24} />,
        Linkedin: <Linkedin size={24} />,
        Twitter: <Twitter size={24} />
    };

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            {/* Background Effects */}
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/hero-bg.jpg"
                    alt="Background"
                    className="w-full h-full object-cover blur-[3px] scale-105"
                />
            </div>
            <div className="absolute inset-0 bg-white/70 z-[1]"></div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 text-center z-10">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-primary font-medium tracking-[0.2em]  mb-4 text-sm md:text-base"
                >
                    {hero.tagline}
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                    className="text-5xl md:text-8xl font-bold text-slate-900 mb-6 tracking-tight"
                >
                    <span className="block uppercase">
                        Welcome to <br className="md:hidden" />
                    </span>
                    <span className="lowercase text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent ">
                        {hero.name} <span className="uppercase">hvac</span>
                    </span>
                </motion.h1>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl md:text-4xl text-gray-600 mb-8 font-light"
                >
                    {hero.title}
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 mb-12"
                >
                    {hero.cta.map((btn, idx) => (
                        <a
                            key={idx}
                            href={btn.link}
                            className={`px-8 py-3 rounded-full font-medium transition-all duration-300 w-48 md:w-auto ${btn.primary
                                ? 'bg-primary text-white hover:bg-blue-600 shadow-lg shadow-blue-500/30'
                                : 'glass text-slate-900 hover:border-primary hover:text-primary'
                                }`}
                        >
                            {btn.label}
                        </a>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-center space-x-8"
                >
                    {hero.socials.map((social, idx) => (
                        <a
                            key={idx}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-primary hover:-translate-y-1 transition-all duration-300"
                        >
                            {socialIcons[social.icon] || social.platform}
                        </a>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
            >
                <a href="#about" className="text-gray-400 hover:text-slate-900 transition-colors">
                    <ArrowDown size={32} />
                </a>
            </motion.div>
        </section>
    );
};

export default Hero;
