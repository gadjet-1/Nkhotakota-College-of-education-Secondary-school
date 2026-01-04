"use client";

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Monitor, BookOpen, Link, Zap, Cloud, Users, ChevronDown, MessageSquare, Check } from 'lucide-react';

// =================================================================
// 🎨 COLOR PALETTE & STYLES
// =================================================================
// Primary Dark: #0A1A2F (Deep Navy)
// Secondary Accent: #F5C542 (Academic Gold)
// Academic Blue: #1E3A8A (Royal Blue)
// Background Light: #F8F7F2 (Soft Cream)

// =================================================================
// FRAMER MOTION VARIANTS & UTILITIES
// =================================================================
const FADE_UP_VARIANT = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const STAGGER_ITEM_VARIANT = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5 }
    }
};

const STAGGER_CONTAINER_VARIANT = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

// =================================================================
// ⚠️ SHARED COMPONENTS (NAVBAR & FOOTER)
// =================================================================

const Navbar = ({ activePage }) => {
    const [isCurriculumOpen, setIsCurriculumOpen] = useState(false);

    const LinkItem = ({ href, children }) => (
        <a 
            href={href} 
            className={`px-3 py-2 rounded-lg transition-colors hover:text-[#F5C542] hover:bg-[#1E3A8A]/20 ${activePage === href ? 'text-[#F5C542] border-b-2 border-[#F5C542]' : 'text-[#F8F7F2]'}`}
        >
            {children}
        </a>
    );

    return (
        <nav className="sticky top-0 z-50 bg-[#0A1A2F] shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <span className="text-2xl font-bold text-[#F5C542] font-['Outfit']">ACADEMY</span>
                <div className="text-sm space-x-6 hidden md:flex items-center">
                    <LinkItem href="/">Home</LinkItem>
                    <LinkItem href="/admissions">Admissions</LinkItem>
                    
                    {/* Curriculum Dropdown */}
                    <div 
                        className="relative" 
                        onMouseEnter={() => setIsCurriculumOpen(true)} 
                        onMouseLeave={() => setIsCurriculumOpen(false)}
                    >
                        <button className={`flex items-center text-[#F8F7F2] px-3 py-2 rounded-lg transition-colors hover:text-[#F5C542] ${isCurriculumOpen || activePage.startsWith('/curriculum') ? 'text-[#F5C542]' : ''}`}>
                            Curriculum
                            <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isCurriculumOpen ? 'rotate-180' : 'rotate-0'}`} />
                        </button>
                        {isCurriculumOpen && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute left-0 mt-2 w-56 rounded-xl shadow-2xl bg-[#1E3A8A] border border-[#F5C542]/50 origin-top-left"
                            >
                                <LinkItem href="/subjects-offered" className="block w-full text-left px-4 py-3 hover:bg-[#0A1A2F]/50">Subjects Offered</LinkItem>
                                <LinkItem href="/e-learning" className="block w-full text-left px-4 py-3 hover:bg-[#0A1A2F]/50">E-Learning Portals</LinkItem>
                            </motion.div>
                        )}
                    </div>
                    
                    <LinkItem href="/alumni">Alumni</LinkItem>
                </div>
                <button className="text-[#F5C542] border border-[#F5C542] px-4 py-1 rounded-xl text-sm hover:bg-[#F5C542] hover:text-[#0A1A2F] transition-all duration-300">
                    Log In
                </button>
            </div>
        </nav>
    );
};

const Footer = () => (
    <footer className="bg-[#111827] text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-[#E5E7EB]">
            © {new Date().getFullYear()} Academy. All Rights Reserved. | Lilongwe, Malawi
        </div>
    </footer>
);

// =================================================================
// PORTALS DATA
// =================================================================

const portals = [
    { 
        title: "Learning Management System (LMS)", 
        icon: Monitor, 
        description: "Your central hub for coursework, assignments, grading, and personalized learning pathways. Access all class materials 24/7.",
        link: "https://lms.academy.edu",
        cta: "Access LMS"
    },
    { 
        title: "Digital Research Library", 
        icon: BookOpen, 
        description: "A vast collection of academic journals, e-books, databases, and multimedia resources to support in-depth research and study.",
        link: "https://library.academy.edu",
        cta: "Explore Library"
    },
    { 
        title: "Collaboration & Communication Suite", 
        icon: Users, 
        description: "Tools for real-time collaboration on group projects, virtual classroom meetings, and secure messaging with faculty members.",
        link: "https://suite.academy.edu",
        cta: "Go to Suites"
    },
    { 
        title: "IT Support & Technical Helpdesk", 
        icon: MessageSquare, 
        description: "Direct access to our dedicated technical support team for assistance with platform issues, account management, and device troubleshooting.",
        link: "https://support.academy.edu",
        cta: "Get Support"
    },
];

// =================================================================
// 💻 CORE COMPONENT: PortalCard
// =================================================================

const PortalCard = ({ portal }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            variants={STAGGER_ITEM_VARIANT}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="bg-white p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:translate-y-[-5px] flex flex-col justify-between"
        >
            <div>
                <portal.icon className="w-10 h-10 mb-4 text-[#1E3A8A]" />
                <h3 className="text-2xl font-bold text-[#0A1A2F] mb-3">{portal.title}</h3>
                <p className="text-gray-600 mb-8">{portal.description}</p>
            </div>
            <a 
                href={portal.link} 
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center py-2 px-4 rounded-xl font-semibold text-white bg-[#F5C542] hover:bg-[#1E3A8A] transition-colors duration-300 shadow-md text-sm"
            >
                {portal.cta} <Link className="w-4 h-4 ml-2" />
            </a>
        </motion.div>
    );
};

// =================================================================
// 🌐 MAIN E-LEARNING PAGE COMPONENT
// =================================================================

const ELearningPage = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <div className="min-h-screen bg-[#F8F7F2] font-['Inter'] text-[#111827]">
            <Navbar activePage="/e-learning" />
            
            <main>
                
                {/* 1. HERO BANNER */}
                <section className="relative h-[45vh] flex items-center bg-[#0A1A2F] overflow-hidden rounded-b-3xl shadow-2xl">
                    <div 
                        className="absolute inset-0 opacity-15 bg-cover bg-center" 
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2070&auto=format&fit=crop')" }}
                    >
                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-6">
                        <motion.div 
                            initial="hidden" 
                            animate="visible" 
                            variants={FADE_UP_VARIANT} 
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-6xl md:text-7xl font-extrabold text-white font-['Outfit'] leading-tight drop-shadow-lg">
                                Digital Learning Hub
                            </h1>
                            <p className="mt-4 text-xl text-white/80 max-w-3xl">
                                Access the tools and resources for modern, flexible, and powerful learning, available anywhere.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* 2. DIGITAL STRATEGY INTRODUCTION */}
                <section className="py-20 px-6">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={FADE_UP_VARIANT}
                        >
                            <Cloud className="w-10 h-10 text-[#F5C542] mb-3" />
                            <h2 className="text-4xl font-bold text-[#1E3A8A] font-['Outfit'] mb-6">
                                Integrated Digital Ecosystem
                            </h2>
                            <p className="text-gray-700 text-lg mb-4">
                                Our e-learning infrastructure is designed to seamlessly integrate classroom instruction with flexible digital resources, preparing students for the technological demands of higher education and the modern workforce.
                            </p>
                            <p className="text-base text-gray-500 italic">
                                "Technology is a tool for enhanced discovery, not a replacement for mentorship."
                            </p>
                        </motion.div>
                        <div className="space-y-4">
                            {[
                                "Personalized learning paths tailored to student pace.",
                                "Real-time progress tracking and faculty feedback.",
                                "Secure, centralized access to all academic materials.",
                                "Fostering digital literacy and responsibility."
                            ].map((item, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    className="flex items-start p-4 bg-white rounded-xl shadow-lg border-l-4 border-[#F5C542]"
                                >
                                    <Check className="w-5 h-5 text-[#1E3A8A] mt-1 mr-3 flex-shrink-0" />
                                    <p className="text-gray-700">{item}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. E-LEARNING PORTALS GRID */}
                <section className="py-20 px-6 bg-white shadow-inner">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={FADE_UP_VARIANT}
                            className="text-center mb-16"
                        >
                            <Zap className="w-10 h-10 text-[#1E3A8A] mx-auto mb-3" />
                            <h2 className="text-4xl font-bold text-[#0A1A2F] font-['Outfit'] mb-3">
                                Essential Portals
                            </h2>
                            <p className="text-xl text-gray-700">
                                Your gateway to academic resources and essential communication platforms.
                            </p>
                        </motion.div>
                        
                        <motion.div
                            ref={ref}
                            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
                            variants={STAGGER_CONTAINER_VARIANT}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                        >
                            {portals.map((portal, index) => (
                                <PortalCard key={index} portal={portal} />
                            ))}
                        </motion.div>
                    </div>
                </section>
                
            </main>

            <Footer />
        </div>
    );
};

export default ELearningPage;