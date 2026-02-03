import React from 'react';
import { motion } from 'framer-motion';
import {
    Snowflake, Wind, Fan, Server, Droplets, ThermometerSnowflake,
    Factory, Shield, Cpu, Activity, ChefHat, HeartPulse, Bell,
    Layout, Database, Cloud, Code, Smartphone, Palette, Globe
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const Services = () => {
    const { data } = useData();
    const { services } = data;

    const getIcon = (iconName) => {
        const icons = {
            Snowflake, Wind, Fan, Server, Droplets, ThermometerSnowflake,
            Factory, Shield, Cpu, Activity, ChefHat, HeartPulse, Bell,
            Layout, Database, Cloud, Code, Smartphone, Palette, Globe
        };
        const Icon = icons[iconName] || Layout;
        return <Icon size={32} />;
    };

    return (
        <section id="services" className="py-24 bg-slate-50 relative">
            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-blue-900 uppercase tracking-wide">OUR SERVICES:</h2>
                    <p className="mt-4 text-blue-900 font-semibold max-w-3xl mx-auto">
                        FOG SEASON HVAC provides a complete range of Mechanical services, including:
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {services && services.map((service, index) => (
                        <motion.div
                            // key={service.id}
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.1)] border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 min-h-[180px] group"
                        >
                            <div className="w-24 h-24 mb-6 relative group-hover:scale-110 transition-transform duration-300">
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                                <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/30 flex items-center justify-center text-white border-4 border-white ring-1 ring-blue-100">
                                    {React.cloneElement(getIcon(service.icon), { size: 40, strokeWidth: 1.5 })}
                                </div>
                            </div>

                            <h3 className="text-base md:text-lg font-bold text-slate-800 leading-tight px-2">{service.title}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
