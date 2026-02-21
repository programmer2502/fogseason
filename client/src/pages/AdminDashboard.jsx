import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Home, User, Briefcase, Code, Layers, MessageSquare, LogOut, Settings, Image } from 'lucide-react';
import HeroEditor from '../components/admin/HeroEditor';
import AboutEditor from '../components/admin/AboutEditor';
import ServicesEditor from '../components/admin/ServicesEditor';
import ProjectsEditor from '../components/admin/ProjectsEditor';
import ExperienceEditor from '../components/admin/ExperienceEditor';
import ContactEditor from '../components/admin/ContactEditor';
import GalleryEditor from '../components/admin/GalleryEditor';

const AdminDashboard = () => {
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState('hero');

    const tabs = [
        { id: 'hero', label: 'Hero Section', icon: Home },
        { id: 'about', label: 'About & Skills', icon: User },
        { id: 'services', label: 'Services', icon: Layers },
        { id: 'experience', label: 'Experience', icon: Briefcase },
        { id: 'projects', label: 'Projects', icon: Code },
        { id: 'gallery', label: 'Gallery', icon: Image },
        { id: 'contact', label: 'Contact Info', icon: MessageSquare },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'hero': return <HeroEditor />;
            case 'about': return <AboutEditor />;
            case 'services': return <ServicesEditor />;
            case 'experience': return <ExperienceEditor />;
            case 'projects': return <ProjectsEditor />;
            case 'gallery': return <GalleryEditor />;
            case 'contact': return <ContactEditor />;
            default: return <HeroEditor />;
        }
    };

    return (
        <div className="flex h-screen bg-dark text-white overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-black border-r border-white/10 flex flex-col hidden md:flex">
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Admin Panel</h2>
                    <p className="text-xs text-gray-500 mt-1">Manage content</p>
                </div>

                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1 px-3">
                        {tabs.map(tab => (
                            <li key={tab.id}>
                                <button
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === tab.id
                                        ? 'bg-primary/10 text-primary font-medium border border-primary/20'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <tab.icon size={20} />
                                    <span>{tab.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">Administrator</p>
                            <p className="text-xs text-gray-500 truncate">admin@portfolio.com</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors text-sm font-medium"
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Nav Header */}
            <div className="md:hidden fixed top-0 w-full bg-black border-b border-white/10 z-20 p-4 flex justify-between items-center">
                <h2 className="text-lg font-bold">Admin Panel</h2>
                <button onClick={logout} className="text-red-500"><LogOut size={20} /></button>
            </div>
            {/* Mobile Sidebar (simplified as horizontal scroll menu for now or just hidden) - enhancing to be usable */}
            <div className="md:hidden fixed bottom-0 w-full bg-black border-t border-white/10 z-20 overflow-x-auto">
                <div className="flex p-2 gap-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-sm ${activeTab === tab.id
                                ? 'bg-primary text-black font-medium'
                                : 'bg-white/5 text-gray-400'
                                }`}
                        >
                            <tab.icon size={16} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-dark p-6 md:p-10 pt-20 md:pt-10 pb-20 md:pb-10">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white capitalize">{tabs.find(t => t.id === activeTab)?.label}</h1>
                            <p className="text-gray-400 mt-1">Manage and update your website content.</p>
                        </div>
                        <div className="flex gap-2">
                            <a href="/" target="_blank" className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white flex items-center gap-2 transition-colors">
                                <span>View Site</span>
                            </a>
                        </div>
                    </div>

                    <div className="bg-black/60 backdrop-blur-xl rounded-xl p-6 md:p-8 border border-white/10 shadow-2xl">
                        {renderContent()}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
