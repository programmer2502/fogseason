import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Projects from '../components/sections/Projects';
import Experience from '../components/sections/Experience';
import Contact from '../components/sections/Contact';
import ProjectDetails from '../components/sections/ProjectDetails';

const Home = () => {
    return (
        <div className="bg-slate-50 min-h-screen text-slate-900 overflow-hidden selection:bg-primary selection:text-white">
            <Navbar />
            <main>
                <Hero />
                <About />
                <Services />
                <Experience />
                <ProjectDetails />
                <Projects />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
