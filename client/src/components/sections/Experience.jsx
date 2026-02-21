import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { useData } from '../../context/DataContext';

const Experience = () => {
    const { data } = useData();
    const { experience } = data;

    return (
        <section id="experience" className="section-padding bg-slate-50 relative">
            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900">Our Journey</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                </motion.div>

                <div className="space-y-12 relative">
                    {/* Timeline Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 transform md:-translate-x-1/2"></div>

                    {experience && experience.map((item, index) => (
                        <motion.div
                            // key={item.id}
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center`}
                        >
                            <div className="flex-1 w-full md:w-1/2 md:px-8 mb-8 md:mb-0">
                                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative group">
                                    <span className="text-sm font-mono text-primary mb-2 block">{item.period}</span>
                                    <h3 className="text-xl font-bold text-slate-900 mb-1">{item.role}</h3>
                                    <div className="text-secondary font-medium mb-4">{item.company}</div>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* Dot */}
                            <div className="absolute left-[-5px] md:left-1/2 w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full transform md:-translate-x-1/2 z-10">
                                <div className="absolute inset-0 bg-primary blur-sm"></div>
                            </div>

                            <div className="flex-1 hidden md:block"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
