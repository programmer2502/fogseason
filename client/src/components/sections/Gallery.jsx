import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useData } from '../../context/DataContext';

// Lightbox Component
const Lightbox = ({ images, startIndex, onClose }) => {
    const [current, setCurrent] = useState(startIndex);

    const prev = () => setCurrent(i => (i - 1 + images.length) % images.length);
    const next = () => setCurrent(i => (i + 1) % images.length);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
                onClick={onClose}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Counter */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
                    {current + 1} / {images.length}
                </div>

                {/* Prev / Next */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={e => { e.stopPropagation(); prev(); }}
                            className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                        >
                            <ChevronLeft size={28} />
                        </button>
                        <button
                            onClick={e => { e.stopPropagation(); next(); }}
                            className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                        >
                            <ChevronRight size={28} />
                        </button>
                    </>
                )}

                {/* Image */}
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="relative max-w-5xl max-h-[85vh] w-full px-16"
                    onClick={e => e.stopPropagation()}
                >
                    <img
                        src={images[current].url}
                        alt={images[current].caption || `Gallery ${current + 1}`}
                        className="w-full h-full object-contain max-h-[80vh] rounded-lg shadow-2xl"
                    />
                    {images[current].caption && (
                        <p className="text-center text-white/80 mt-3 text-sm">{images[current].caption}</p>
                    )}
                </motion.div>

                {/* Dot indicators */}
                {images.length > 1 && (
                    <div className="absolute bottom-6 flex gap-2">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={e => { e.stopPropagation(); setCurrent(idx); }}
                                className={`w-2 h-2 rounded-full transition-all ${idx === current ? 'bg-white w-5' : 'bg-white/40'}`}
                            />
                        ))}
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
};

// Coming Soon card
const ComingSoon = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center py-24 px-6 text-center"
    >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center mb-6 border-2 border-dashed border-secondary/30">
            <Camera size={40} className="text-secondary/60" />
        </div>
        <h3 className="text-2xl font-bold text-slate-700 mb-2">Gallery Coming Soon</h3>
        <p className="text-gray-500 max-w-sm">
            Our project gallery is being curated. Check back soon for photos of our latest work.
        </p>
    </motion.div>
);

// Gallery Item Card
const GalleryCard = ({ item, index, onClick }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
        onClick={() => onClick(index)}
        style={{
            // Vary heights for a masonry feel across items
            gridRowEnd: `span ${index % 3 === 0 ? 2 : 1}`
        }}
    >
        <img
            src={item.url}
            alt={item.caption || `Gallery image ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ minHeight: index % 3 === 0 ? '320px' : '200px' }}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            {item.caption && (
                <p className="text-white text-sm font-medium translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {item.caption}
                </p>
            )}
            <div className="mt-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                <span className="inline-flex items-center gap-1 text-xs text-white/70">
                    <ZoomIn size={14} /> Click to view
                </span>
            </div>
        </div>
    </motion.div>
);

// Main Gallery Section
const Gallery = () => {
    const { data } = useData();
    const gallery = data.gallery || [];
    const [lightboxIndex, setLightboxIndex] = useState(null);

    return (
        <section id="gallery" className="py-24 bg-white relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-secondary/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-accent/5 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">Quality Execution Gallery</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-secondary to-accent mx-auto rounded-full" />
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                        A visual showcase of our completed projects and installations.
                    </p>
                </motion.div>

                {/* Grid or Coming Soon */}
                {gallery.length === 0 ? (
                    <ComingSoon />
                ) : (
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                        style={{ gridAutoRows: '160px' }}
                    >
                        {gallery.map((item, index) => (
                            <GalleryCard
                                key={item._id || index}
                                item={item}
                                index={index}
                                onClick={setLightboxIndex}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <Lightbox
                    images={gallery}
                    startIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </section>
    );
};

export default Gallery;
