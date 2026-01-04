import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Atom, Globe, Palette, BookOpen, ChevronDown, Check } from 'lucide-react';

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
// SUBJECTS DATA
// =================================================================

const subjectStreams = [
    { 
        title: "Science & Technology Stream", 
        icon: Atom, 
        color: 'bg-red-700', 
        description: "Focusing on inquiry, experimentation, and critical thinking in foundational and emerging scientific fields.",
        subjects: ["Advanced Physics", "Organic Chemistry", "Computer Science (Python & Java)", "Applied Mathematics", "Engineering Principles"] 
    },
    { 
        title: "Humanities & Global Studies", 
        icon: Globe, 
        color: 'bg-indigo-700', 
        description: "Cultivating global citizens through deep study of history, language, philosophy, and socio-economic systems.",
        subjects: ["Global History", "Classical Literature", "Economics", "Philosophy & Ethics", "Foreign Languages (French, Mandarin)"] 
    },
    { 
        title: "Creative & Practical Arts", 
        icon: Palette, 
        color: 'bg-green-700', 
        description: "Nurturing expression and skill development through practical application in visual, auditory, and applied arts.",
        subjects: ["Studio Art & Design", "Music Theory & Composition", "Drama & Performance", "Financial Accounting", "Woodwork & Design Technology"] 
    },
];

// =================================================================
// 🎓 CORE COMPONENT: SubjectStreamCard
// =================================================================

const SubjectStreamCard = ({ stream }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            variants={STAGGER_ITEM_VARIANT}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="bg-white p-8 rounded-2xl shadow-xl border-t-8 border-[#1E3A8A] transition-all duration-500 hover:shadow-2xl hover:translate-y-[-5px]"
        >
            <stream.icon className={`w-10 h-10 mb-4 text-[#F5C542]`} />
            <h3 className="text-2xl font-bold text-[#0A1A2F] mb-3">{stream.title}</h3>
            <p className="text-gray-600 mb-6 text-sm italic">{stream.description}</p>
            
            <h4 className="font-semibold text-[#1E3A8A] mb-3 border-b pb-1">Key Offerings:</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
                {stream.subjects.map((subject, index) => (
                    <li key={index} className="flex items-start">
                        <Check className="w-4 h-4 text-[#F5C542] mr-2 mt-1 flex-shrink-0" />
                        <span>{subject}</span>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};

// =================================================================
// 📚 MAIN SUBJECTS PAGE COMPONENT
// =================================================================

const SubjectsOfferedPage = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <div className="min-h-screen bg-[#F8F7F2] font-['Inter'] text-[#111827]">
            <Navbar activePage="/subjects-offered" />
            
            <main>
                
                {/* 1. HERO BANNER */}
                <section className="relative h-[45vh] flex items-center bg-[#1E3A8A] overflow-hidden rounded-b-3xl shadow-2xl">
                    <div 
                        className="absolute inset-0 opacity-10 bg-cover bg-center" 
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop')" }}
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
                                Academic Streams & Curriculum
                            </h1>
                            <p className="mt-4 text-xl text-white/90 max-w-3xl">
                                A rigorously developed curriculum designed to foster expertise, creativity, and critical global awareness.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* 2. ACADEMIC STRUCTURE INTRODUCTION */}
                <section className="py-20 px-6">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={FADE_UP_VARIANT}
                        >
                            <BookOpen className="w-10 h-10 text-[#F5C542] mx-auto mb-3" />
                            <h2 className="text-4xl font-bold text-[#0A1A2F] font-['Outfit'] mb-4">
                                The Framework of Knowledge
                            </h2>
                            <p className="text-lg text-gray-700">
                                Our educational philosophy encourages depth over breadth, allowing students to specialize early while maintaining a strong foundational base in liberal arts. The curriculum is delivered by expert faculty and benchmarked against international standards.
                            </p>
                            <div className="mt-8">
                                <a href="#streams" className="inline-flex items-center text-[#1E3A8A] font-semibold hover:text-[#F5C542] transition">
                                    Explore Core Streams <ChevronDown className="w-4 h-4 ml-1" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 3. SUBJECT CATEGORY GRIDS */}
                <section id="streams" className="py-20 px-6 bg-white shadow-inner">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            ref={ref}
                            className="grid md:grid-cols-3 gap-8"
                            variants={STAGGER_CONTAINER_VARIANT}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                        >
                            {subjectStreams.map((stream, index) => (
                                <SubjectStreamCard key={index} stream={stream} />
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* 4. CERTIFICATION & ADVANCEMENT */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto p-10 bg-[#1E3A8A] rounded-2xl text-white shadow-xl">
                        <h2 className="text-3xl font-bold text-[#F5C542] mb-4">
                            Assessment and Certification
                        </h2>
                        <p className="text-lg opacity-90 max-w-4xl">
                            Students are prepared for external certification examinations, including the **Cambridge International Examinations (CIE)** and the national **MSCE**, ensuring successful progression to top global universities and institutions.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-6 text-sm font-medium">
                            <span className="bg-[#F5C542] text-[#0A1A2F] py-1 px-3 rounded-full shadow-md">A-Levels Readiness</span>
                            <span className="bg-[#F5C542] text-[#0A1A2F] py-1 px-3 rounded-full shadow-md">National Standard Compliant</span>
                            <span className="bg-[#F5C542] text-[#0A1A2F] py-1 px-3 rounded-full shadow-md">Project-Based Assessment</span>
                        </div>
                    </div>
                </section>
                
            </main>

            <Footer />
        </div>
    );
};

export default SubjectsOfferedPage;