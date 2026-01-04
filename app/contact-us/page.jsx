"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
    Mail, Phone, MapPin, Clock, ArrowUpRight,
    Users, Wallet, BookCheck, ShieldCheck,
    ChevronDown, Send, Calendar, Download, School, Check,
    MessageSquare, Facebook, Twitter, Instagram, Linkedin,
    Menu, X, GraduationCap, Map, Globe, Award
} from "lucide-react";

// =================================================================
// 🎨 ENHANCED DESIGN TOKENS
// =================================================================
const COLORS = {
    Primary: '#1A2F4B',       // Deep Navy (Authority)
    Accent: '#F5B920',        // Vibrant Gold (Excellence)
    AccentLight: '#FFF9EB',   // Soft Gold Tint
    Charcoal: '#2D3748',      // Rich Text
    Slate: '#718096',         // Subtext
    Neutral: '#F8FAFC',       // Clean Background
    White: '#FFFFFF',
    Border: '#E2E8F0'
};

const SHADOW_PREMIUM = 'shadow-[0_8px_30px_rgb(0,0,0,0.04)]';
const SHADOW_HOVER = 'shadow-[0_20px_40px_rgba(0,0,0,0.08)]';

// =================================================================
// ⚙️ ANIMATION VARIANTS
// =================================================================
const FADE_UP = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

// =================================================================
// 🧩 UI COMPONENTS
// =================================================================

const Navbar = ({ activePage, setActivePage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", id: "home" },
        { name: "Admissions", id: "admissions" },
        { name: "Academics", id: "academics" },
        { name: "Contact", id: "contact" },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActivePage('home')}>
                    <div className="bg-[#1A2F4B] p-2.5 rounded-xl transition-transform group-hover:scale-110">
                        <GraduationCap className="text-[#F5B920] w-6 h-6" />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="font-bold text-xl tracking-tight text-[#1A2F4B]">NCOE</span>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#F5B920]">Secondary</span>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => setActivePage(link.id)}
                            className={`text-sm font-bold uppercase tracking-wider transition-all relative group ${activePage === link.id ? 'text-[#F5B920]' : 'text-[#1A2F4B]/70 hover:text-[#1A2F4B]'}`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#F5B920] transition-all duration-300 ${activePage === link.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                        </button>
                    ))}
                    <button 
                        onClick={() => setActivePage('admissions')}
                        className="bg-[#1A2F4B] text-white px-7 py-3 rounded-full text-sm font-bold hover:bg-[#F5B920] hover:text-[#1A2F4B] transition-all shadow-lg"
                    >
                        ENROLL NOW
                    </button>
                </div>

                <button className="md:hidden text-[#1A2F4B]" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden bg-white border-b border-gray-100 absolute w-full"
                    >
                        <div className="px-6 py-8 flex flex-col gap-5">
                            {navLinks.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => { setActivePage(link.id); setIsOpen(false); }}
                                    className="text-left text-lg font-bold text-[#1A2F4B]"
                                >
                                    {link.name}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const Footer = ({ setActivePage }) => (
    <footer className="bg-[#1A2F4B] text-white pt-20 pb-10 px-6 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F5B920] to-transparent opacity-30" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <GraduationCap className="text-[#F5B920] w-8 h-8" />
                    <span className="font-bold text-2xl tracking-tighter">NCOE <span className="text-[#F5B920]">SECONDARY</span></span>
                </div>
                <p className="text-gray-400 leading-relaxed text-sm">
                    Providing a foundation of excellence through disciplined academics and character development since inception.
                </p>
                <div className="flex gap-3">
                    {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                        <a key={i} href="#" className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:border-[#F5B920] hover:text-[#F5B920] transition-all">
                            <Icon size={18} />
                        </a>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="text-sm uppercase tracking-[0.2em] font-bold text-[#F5B920] mb-8">Navigation</h4>
                <ul className="space-y-4">
                    {['Home', 'Admissions', 'Academics', 'Portal', 'Contact'].map((item) => (
                        <li key={item}>
                            <button 
                                onClick={() => setActivePage(item.toLowerCase())}
                                className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                            >
                                <span className="w-0 group-hover:w-4 h-[1px] bg-[#F5B920] transition-all" />
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h4 className="text-sm uppercase tracking-[0.2em] font-bold text-[#F5B920] mb-8">Direct Contact</h4>
                <ul className="space-y-5 text-sm text-gray-400">
                    <li className="flex gap-4">
                        <MapPin size={18} className="text-[#F5B920] shrink-0" />
                        <span>Opposite Agriculture Offices,<br />Nkhotakota Boma, Malawi</span>
                    </li>
                    <li className="flex items-center gap-4">
                        <Phone size={18} className="text-[#F5B920] shrink-0" />
                        <span>+265 992 025 537</span>
                    </li>
                    <li className="flex items-center gap-4">
                        <Mail size={18} className="text-[#F5B920] shrink-0" />
                        <span>info@nkhotakota.edu.mw</span>
                    </li>
                </ul>
            </div>

            <div>
                <h4 className="text-sm uppercase tracking-[0.2em] font-bold text-[#F5B920] mb-8">Newsletter</h4>
                <p className="text-gray-400 mb-6 text-xs leading-relaxed">Join our mailing list for term dates and official school announcements.</p>
                <div className="relative">
                    <input type="email" placeholder="Your Email" className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 w-full text-sm focus:outline-none focus:border-[#F5B920] transition-all" />
                    <button className="absolute right-2 top-2 bottom-2 bg-[#F5B920] text-[#1A2F4B] px-4 rounded-lg hover:bg-white transition-all">
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-[10px] uppercase tracking-widest font-bold">
            <p>&copy; {new Date().getFullYear()} Nkhotakota College of Education</p>
            <div className="flex gap-8">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
        </div>
    </footer>
);

// =================================================================
// 📩 CONTACT FORM SUB-COMPONENT
// =================================================================

const ContactForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 4000);
    };

    const inputClasses = "w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#F5B920]/20 focus:border-[#F5B920] focus:bg-white outline-none transition-all text-[#1A2F4B] placeholder-slate-400";

    return (
        <motion.form
            ref={formRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={FADE_UP}
            onSubmit={handleSubmit}
            className={`p-10 md:p-14 bg-white rounded-[2rem] ${SHADOW_PREMIUM} border border-slate-100 relative overflow-hidden`}
        >
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <Mail size={120} className="text-[#1A2F4B]" />
            </div>

            <div className="relative z-10">
                <h3 className="text-3xl font-extrabold text-[#1A2F4B] mb-2">Send a Message</h3>
                <p className="text-slate-500 mb-10 text-lg">Our administrative team usually responds within 24 hours.</p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#1A2F4B] ml-1">Full Name</label>
                        <input type="text" required className={inputClasses} placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#1A2F4B] ml-1">Email Address</label>
                        <input type="email" required className={inputClasses} placeholder="john@example.com" />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#1A2F4B] ml-1">Phone Number</label>
                        <input type="tel" className={inputClasses} placeholder="+265..." />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#1A2F4B] ml-1">Subject</label>
                        <select className={`${inputClasses} appearance-none`}>
                            <option>Admissions Inquiry</option>
                            <option>Fee Statement</option>
                            <option>Academic Report</option>
                            <option>General Support</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2 mb-10">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1A2F4B] ml-1">Your Message</label>
                    <textarea required rows="5" className={inputClasses} placeholder="How can we help you today?"></textarea>
                </div>

                <motion.button
                    type="submit"
                    disabled={isSubmitted}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl transition-all flex items-center justify-center gap-3
                    ${isSubmitted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-[#1A2F4B] text-white hover:bg-[#F5B920] hover:text-[#1A2F4B]'
                    }`}
                >
                    {isSubmitted ? (
                        <><Check size={20} /> Message Sent Successfully</>
                    ) : (
                        <><Send size={18} /> Transmit Message</>
                    )}
                </motion.button>
            </div>
        </motion.form>
    );
};

// =================================================================
// 🚀 MAIN APPLICATION
// =================================================================

export default function App() {
    const [activePage, setActivePage] = useState("contact");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [activePage]);

    if (activePage !== "contact") {
        return (
            <div className="min-h-screen flex flex-col font-sans bg-[#F8FAFC]">
                <Navbar activePage={activePage} setActivePage={setActivePage} />
                <div className="flex-grow flex items-center justify-center pt-32 pb-20 px-6">
                    <div className="text-center max-w-xl">
                        <div className="bg-[#1A2F4B] inline-flex p-8 rounded-[2.5rem] mb-10 text-[#F5B920] shadow-2xl">
                            <School size={80} />
                        </div>
                        <h1 className="text-5xl font-black text-[#1A2F4B] mb-6 tracking-tight uppercase">
                            {activePage} <span className="text-[#F5B920]">Hub</span>
                        </h1>
                        <p className="text-slate-500 text-xl leading-relaxed mb-10">
                            The requested academic department is currently being updated for the new school term. 
                        </p>
                        <button 
                            onClick={() => setActivePage('contact')}
                            className="bg-[#1A2F4B] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#F5B920] hover:text-[#1A2F4B] transition-all shadow-xl uppercase tracking-widest text-xs"
                        >
                            Return to Contact HQ
                        </button>
                    </div>
                </div>
                <Footer setActivePage={setActivePage} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#2D3748] selection:bg-[#F5B920]/30">
            <Navbar activePage={activePage} setActivePage={setActivePage} />

            {/* Sticky WhatsApp - Cleaned up */}
            <motion.a
                href="https://wa.me/265996415590"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="fixed right-6 bottom-8 z-50 w-16 h-16 rounded-2xl bg-white shadow-2xl flex items-center justify-center border border-slate-100 text-green-600 transition-colors hover:bg-green-600 hover:text-white"
            >
                <MessageSquare size={32} />
            </motion.a>

            <main>
                {/* HERO SECTION - REFINED */}
                <section className="relative pt-44 pb-32 overflow-hidden bg-white">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1A2F4B 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                    <div className="max-w-7xl mx-auto px-6 relative">
                        <motion.div initial="hidden" animate="visible" variants={FADE_UP} className="max-w-4xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A2F4B]/5 rounded-full text-[#1A2F4B] text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                                <Globe size={14} className="text-[#F5B920]" />
                                Global Reach • Local Presence
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-[#1A2F4B] leading-[1.1] mb-8 tracking-tighter">
                                Connected to Our <br />
                                <span className="text-[#F5B920]">Community.</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-500 leading-relaxed max-w-2xl">
                                Your journey towards excellence starts with a conversation. We are dedicated to providing the support you need for academic success.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* CONTACT GRID */}
                <div className="max-w-7xl mx-auto px-6 -mt-16 pb-32 relative z-10">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Info Column */}
                        <div className="lg:col-span-1 space-y-6">
                            {[
                                { 
                                    icon: MapPin, title: "Headquarters", 
                                    details: "Nkhotakota Boma, Opposite Agriculture Offices",
                                    meta: "View on Map"
                                },
                                { 
                                    icon: Phone, title: "Support Lines", 
                                    details: "+265 992 025 537",
                                    meta: "Admin Office"
                                },
                                { 
                                    icon: Mail, title: "Digital Mail", 
                                    details: "info@nkhotakota.edu.mw",
                                    meta: "Official Inquiries"
                                },
                                { 
                                    icon: Clock, title: "Working Hours", 
                                    details: "07:30 - 16:30",
                                    meta: "Monday to Friday"
                                }
                            ].map((item, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial="hidden" 
                                    whileInView="visible" 
                                    viewport={{ once: true }} 
                                    variants={FADE_UP}
                                    className={`bg-white p-8 rounded-3xl border border-slate-100 ${SHADOW_PREMIUM} hover:${SHADOW_HOVER} transition-all group cursor-default`}
                                >
                                    <div className="flex gap-6 items-center">
                                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#1A2F4B] group-hover:bg-[#1A2F4B] group-hover:text-[#F5B920] transition-colors">
                                            <item.icon size={26} />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#F5B920] block mb-1">{item.meta}</span>
                                            <h4 className="font-extrabold text-[#1A2F4B] text-lg leading-tight">{item.title}</h4>
                                            <p className="text-slate-500 text-sm mt-1 font-medium">{item.details}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Form Column */}
                        <div className="lg:col-span-2">
                            <ContactForm />
                        </div>
                    </div>
                </div>

                {/* Map Section - Refined */}
                <section className="bg-[#1A2F4B] py-32 px-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F5B920]/5 skew-x-[-20deg] translate-x-32" />
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <div className="text-white">
                                <div className="inline-flex items-center gap-2 mb-6">
                                    <Award className="text-[#F5B920]" size={24} />
                                    <span className="uppercase tracking-[0.3em] font-bold text-xs text-[#F5B920]">Visit our campus</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tight">Accessible Education <br />In Nkhotakota.</h2>
                                <p className="text-gray-400 text-xl leading-relaxed mb-12 max-w-lg">
                                    Located at the heart of the district, our facilities are designed to foster growth and learning. Join us for a guided tour of our modern secondary school environment.
                                </p>
                                <div className="grid grid-cols-2 gap-6 mb-12">
                                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                        <h5 className="font-bold text-white mb-1">M5 Highway</h5>
                                        <p className="text-gray-500 text-sm">Main access route</p>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                        <h5 className="font-bold text-white mb-1">Central Hub</h5>
                                        <p className="text-gray-500 text-sm">Near Town Center</p>
                                    </div>
                                </div>
                                <button className="inline-flex items-center gap-4 bg-[#F5B920] text-[#1A2F4B] px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-2xl">
                                    Open Navigation <Map size={18} />
                                </button>
                            </div>
                            <div className={`aspect-square lg:aspect-video w-full rounded-[2.5rem] overflow-hidden border-[12px] border-white/5 shadow-2xl`}>
                                <iframe
                                    title="Nkhotakota College of Education - Map"
                                    src="https://www.google.com/maps?q=Nkhotakota+college+of+education+secondary+school+nkhotakota&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trust Resources */}
                <section className="py-32 px-6 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-slate-100 pb-12">
                            <div>
                                <h2 className="text-4xl font-black text-[#1A2F4B] tracking-tight mb-4 uppercase">Portal <span className="text-[#F5B920]">&</span> Support</h2>
                                <p className="text-slate-500 text-lg">Instant access to critical school resources and student information.</p>
                            </div>
                            <div className="hidden lg:block h-1 w-32 bg-[#F5B920]" />
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { title: "Results Portal", icon: BookCheck, color: "blue" },
                                { title: "Enrollment", icon: Users, color: "gold" },
                                { title: "Fee Support", icon: Wallet, color: "navy" },
                                { title: "Resource Center", icon: Download, color: "slate" }
                            ].map((item, i) => (
                                <motion.button
                                    key={i}
                                    whileHover={{ y: -8 }}
                                    onClick={() => setActivePage(item.title.toLowerCase())}
                                    className={`p-10 bg-slate-50 rounded-[2rem] text-left group transition-all hover:bg-white hover:${SHADOW_PREMIUM} border border-transparent hover:border-slate-100`}
                                >
                                    <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center text-[#1A2F4B] mb-8 shadow-sm group-hover:scale-110 transition-transform">
                                        <item.icon size={30} className="text-[#F5B920]" />
                                    </div>
                                    <h4 className="text-xl font-black text-[#1A2F4B] mb-2 uppercase tracking-tight">{item.title}</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6">Secure access to administrative data and educational materials.</p>
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#F5B920]">
                                        Explore <ArrowUpRight size={14} />
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer setActivePage={setActivePage} />
        </div>
    );
}