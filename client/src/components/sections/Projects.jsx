import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

const ProjectCard = ({ project }) => {
    const images = project.images && project.images.length > 0 ? project.images : [project.image];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (images.length <= 1 || isHovered) return;

        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(timer);
    }, [images.length, isHovered]);

    const nextImage = (e) => {
        if (e) e.stopPropagation();
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        if (e) e.stopPropagation();
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0
        })
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="group h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                <div className="relative overflow-hidden aspect-video group-image-container">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.img
                            key={currentIndex}
                            src={images[currentIndex]}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            alt={project.title}
                            className="w-full h-full object-cover absolute inset-0"
                        />
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 z-10"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 z-10"
                            >
                                <ChevronRight size={20} />
                            </button>

                            {/* Dots */}
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                                {images.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-3' : 'bg-white/50'}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
                        <div className="flex space-x-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 pointer-events-auto">
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-slate-900 transition-colors">
                                <Github size={20} />
                            </a>
                            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-slate-900 transition-colors">
                                <ExternalLink size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="text-xs font-bold text-secondary uppercase tracking-wider block mb-1">{project.category}</span>
                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-secondary transition-colors">{project.title}</h3>
                        </div>
                    </div>
                    <p className="text-gray-600 mb-6 flex-1 line-clamp-3">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.map(tag => (
                            <span key={tag} className="text-xs font-medium px-3 py-1 bg-slate-100 text-gray-700 rounded-full">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const { data } = useData();
    const { projects } = data;
    const [filter, setFilter] = useState('All');

    const allTags = ['All', ...new Set(projects ? projects.map(p => p.category) : [])];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <section id="projects" className="py-24 bg-slate-50 relative">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">Featured Projects</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-secondary to-accent mx-auto rounded-full"></div>
                </motion.div>

                {/* Filters */}
                <div className="flex justify-center flex-wrap gap-4 mb-16">
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setFilter(tag)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === tag
                                ? 'bg-gradient-to-r from-secondary to-accent text-white shadow-lg'
                                : 'bg-white text-gray-600 border border-slate-200 hover:text-slate-900 hover:border-secondary'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredProjects && filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
