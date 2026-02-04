import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, TextWrap } from 'lucide-react';
import { useData } from '../../context/DataContext';
import "./projectDetails.css"
const ProjectDetails = () => {
    const { data } = useData();
    const { projectDetails } = data;

    return (
        <section id="projectDetails" className="py-24 bg-slate-50 relative">
            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">What we do</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                </motion.div>

                <div className="space-y-12 relative">
                    {/* Timeline Line */}
                   

                    <div className="auto-text">
                        <span className="changing-text">
                            <span>

                                <b>

                                    Design and Engineering:
                                </b>

                                Include any necessary calculations, selections,
                                and schematic designs. Mention the creation of
                                blueprints or digital models if applicable.
                            </span>
                            <span>

                                <b>

                                    Procurement:
                                </b>

                                Describe the process for acquiring HVAC units
                                and components, including timelines and
                                supplier details.
                            </span>
                            <span>


                                <b>

                                    Installation:
                                </b>

                                Outline the steps for installing the equipment,
                                from site preparation to testing and
                                commissioning.
                            </span>
                            <span>


                                <b>

                                    Commissioning and Testing:
                                </b>

                                Specify procedures for ensuring that installed
                                systems meet design specifications and
                                operational requirements.
                            </span>
                            <span>
                                <b>
                                    Annual Maintenance Contracts:
                                </b>
                                This includes tasks like cleaning, inspecting, and
                                replacing parts to keep your system running
                                efficiently. AMCs help prevent breakdowns,
                                extend the lifespan of your equipment, and
                                potentially lower energy costs.
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectDetails;
