import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';

const About = () => {
    const { data } = useData();
    const { about } = data;

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        '/ab1.jpg',
        '/ab2.jpg',
        '/ab3.jpg',
        '/ab4.jpg'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">About Us</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative group"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-500"></div>
                        <div className="relative rounded-2xl overflow-hidden aspect-square md:aspect-[3/4] glass p-2 transform group-hover:scale-[1.02] transition-transform duration-500">
                            <div className="relative w-full h-full rounded-xl overflow-hidden">
                                <AnimatePresence>
                                    <motion.img
                                        key={currentImageIndex}
                                        src={images[currentImageIndex]}
                                        alt="About Us"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 2.5, ease: "easeInOut" }}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </AnimatePresence>
                                <div className="absolute inset-0 bg-primary mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-gray-500 mb-6">
                            Delivering world-class engineering solutions.
                        </h3>
                        <div
                            className="text-gray-600 text-lg leading-relaxed mb-8 prose prose-slate"
                            dangerouslySetInnerHTML={{ __html: about.bio }}
                        />

                        <div className="grid grid-cols-2 gap-6 mb-10">
                            <div className="glass p-6 rounded-xl text-center border-t-2 border-primary hover:bg-blue-50/50 transition-colors">
                                <span className="block text-4xl font-bold text-slate-900 mb-2">{about.experienceYears}+</span>
                                <span className="text-sm text-primary uppercase tracking-widest font-semibold">Years Exp.</span>
                            </div>
                            <div className="glass p-6 rounded-xl text-center border-t-2 border-secondary hover:bg-purple-50/50 transition-colors">
                                <span className="block text-4xl font-bold text-slate-900 mb-2">{about.projectsCompleted}+</span>
                                <span className="text-sm text-secondary uppercase tracking-widest font-semibold">Projects</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-xl font-semibold text-slate-900">Technical Proficiency</h4>
                            {about.skills && about.skills.map((skill, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span className="text-gray-600">{skill.name}</span>
                                        <span className="text-primary">{skill.level}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, delay: 0.1 * index, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
                                        >
                                            <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                                        </motion.div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
