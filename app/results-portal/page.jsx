"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Download, Key, ChevronDown, CheckCircle, XCircle, 
    BookOpen, ExternalLink, HelpCircle, Phone, Mail, Loader, Lock,
    Menu, X // Needed for Navbar mobile menu
} from 'lucide-react';

import Footer from "@/components/footer";
// =================================================================
// 🎨 GLOBAL COLORS & PALETTE
// =================================================================
// Portal-specific colors (Maroon/Burgundy)
const COLORS = {
    Maroon: '#5A0F19', // Academic Maroon (Primary)
    Burgundy: '#7A1F2B', // Royal Burgundy (Secondary)
    Blush: '#F7EDEE',  // Soft Blush Tint (Light/Error Background)
    Slate: '#1A1A1A',  // Slate Black (Text)
    Feather: '#F6F6F6',  // Feather Gray (Background/Input)
    Silver: '#C6C6C6',  // Muted Silver (Accent/Borders)
};

// Site-wide Academic Colors (Navy/Gold)
const NAV_BG = '#0A1A2F'; // Deep Navy
const NAV_ACCENT = '#F5C542'; // Academic Gold
const FOOTER_BG = '#1A1A1A'; // Deep Charcoal


// =================================================================
// ⚙️ FRAMER MOTION VARIANTS & UTILITIES
// =================================================================
const FADE_UP_VARIANT = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" }
    }
};

const SHAKE_VARIANT = {
    shake: {
        x: [0, -10, 10, -10, 10, 0],
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    }
};

const STAGGER_CONTAINER_VARIANT = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15, 
        },
    },
};

// =================================================================
// 🧩 1. Navbar Component (Consolidated)
// =================================================================
const Navbar = ({ activePage = '' }) => {
    const [isCurriculumOpen, setIsCurriculumOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const LinkItem = ({ href, children, isMobile = false }) => (
        <motion.a 
            href={href} 
            className={`px-3 py-2 rounded-lg transition-colors duration-300 font-medium 
                ${isMobile ? 'text-lg block w-full text-left' : 'text-sm'}
                ${activePage === href 
                    // FIX: Replaced interpolated variable with direct hex code
                    ? `text-[#F5C542] border-b-2 border-[#F5C542]` 
                    // FIX: Replaced interpolated variable with direct hex code
                    : 'text-[#F8F7F2] hover:text-white hover:bg-[#0A1A2F]/30'
                }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
        >
            {children}
        </motion.a>
    );
    
    const links = [
        { href: "/", label: "Home" },
        { href: "/admissions", label: "Admissions" },
        { href: "/alumni", label: "Alumni" },
        { href: "/contact-us", label: "Contact Us" },
    ];
    
    const curriculumLinks = [
        { href: "/subjects-offered", label: "Subjects Offered" },
        { href: "/e-learning", label: "E-Learning Portals" },
    ];

    // FIX: Replaced interpolated variable with direct hex code
    return (
        <nav className={`sticky top-0 z-50 bg-[#0A1A2F] shadow-xl border-b border-gray-700/50`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* FIX: Replaced interpolated variable with direct hex code */}
                <span className={`text-2xl font-bold text-[#F5C542] font-['Outfit'] tracking-wider`}>NCOE RESULTS PORTAL</span>
                
                {/* Desktop Menu */}
                <div className="text-sm space-x-6 hidden md:flex items-center">
                    {links.map(link => (
                        <LinkItem key={link.href} href={link.href}>{link.label}</LinkItem>
                    ))}
                    
                    {/* Curriculum Dropdown */}
                    <div 
                        className="relative" 
                        onMouseEnter={() => setIsCurriculumOpen(true)} 
                        onMouseLeave={() => setIsCurriculumOpen(false)}
                    >
                        <button className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-300 
                            ${isCurriculumOpen || activePage.startsWith('/curriculum') 
                                // FIX: Replaced interpolated variable with direct hex code
                                ? `text-[#F5C542]` 
                                // FIX: Replaced interpolated variable with direct hex code
                                : 'text-[#F8F7F2] hover:text-white hover:bg-[#0A1A2F]/30'
                            }`}
                        >
                            Curriculum
                            <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isCurriculumOpen ? 'rotate-180' : 'rotate-0'}`} />
                        </button>
                        {isCurriculumOpen && (
                            <motion.div 
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                // FIX: Replaced interpolated variable with direct hex code
                                className={`absolute left-0 mt-2 w-56 rounded-xl shadow-2xl bg-[#1E3A8A] border border-[#F5C542]/50 origin-top-left overflow-hidden`}
                            >
                                {curriculumLinks.map(link => (
                                    <LinkItem key={link.href} href={link.href} className="block w-full text-left px-4 py-3 hover:bg-[#0A1A2F]/50">
                                        {link.label}
                                    </LinkItem>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>
                
                {/* Action Button */}
                <motion.button 
                    // FIX: Replaced interpolated variable with direct hex code
                    className={`text-[#F5C542] border border-[#F5C542] px-4 py-1.5 rounded-full text-sm font-semibold 
                        // FIX: Replaced interpolated variable with direct hex code
                        hover:bg-[#F5C542] hover:text-[#0A1A2F] transition-all duration-300 shadow-md`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Log In
                </motion.button>
                
                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-white p-2 rounded-md hover:bg-[#F5C542]/20 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>
            
            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`md:hidden bg-[#0A1A2F] border-t border-gray-700/50 pb-4 px-4`}
                    >
                        <div className="flex flex-col space-y-2 pt-2">
                            {links.map(link => (
                                <LinkItem key={link.href} href={link.href} isMobile>
                                    {link.label}
                                </LinkItem>
                            ))}
                            
                            {/* Mobile Curriculum Links */}
                            <div className="pt-2 border-t border-gray-700/50 mt-2">
                                <span className="block text-white/70 px-3 py-2 text-sm font-bold">Curriculum</span>
                                {curriculumLinks.map(link => (
                                    <LinkItem key={link.href} href={link.href} isMobile>
                                        &mdash; {link.label}
                                    </LinkItem>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};




// =================================================================
// 3. PAGE COMPONENTS (from pages/results-portal.jsx)
// =================================================================

const CredentialsForm = ({ setReportStatus, setReportData, setErrorMessage }) => {
    const [credentials, setCredentials] = useState({
        name: '',
        candidateNumber: '',
        formLevel: 'Form 4',
        term: 'Term 3',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isShake, setIsShake] = useState(false);
    const formRef = useRef(null);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setReportStatus('loading');
        setIsSubmitting(true);
        setErrorMessage('');

        // --- Mock Backend Check ---
        setTimeout(() => {
            setIsSubmitting(false);

            // Mock Success Condition: Candidate Number must be "12345"
            if (credentials.candidateNumber === '12345' && credentials.name.trim()) {
                setReportStatus('success');
                setReportData({
                    studentName: credentials.name,
                    candidateNumber: credentials.candidateNumber,
                    form: credentials.formLevel,
                    term: credentials.term,
                    mockGrade: 'Distinction',
                    date: new Date().toLocaleDateString('en-US'),
                });
            } else {
                setReportStatus('error');
                setErrorMessage("We couldn't find a report matching the entered details.");
                // Micro-interaction: Shake on error
                setIsShake(true);
                setTimeout(() => setIsShake(false), 500);
            }
        }, 1500); // Simulate network latency
    };

    // FIX: Replaced interpolated variable with direct hex code
    const InputClasses = `w-full p-4 text-[#1A1A1A] bg-[#F6F6F6] rounded-lg border border-[#C6C6C6] 
                         // FIX: Replaced interpolated variable with direct hex code
                         focus:border-[#5A0F19] focus:ring-1 focus:ring-[#5A0F19] transition-all outline-none`;

    return (
        <motion.div 
            initial="hidden"
            animate={isShake ? "shake" : "visible"}
            variants={{ ...FADE_UP_VARIANT, ...SHAKE_VARIANT }}
            className={`p-6 md:p-10 bg-white rounded-xl shadow-2xl`}
        >
            {/* FIX: Replaced interpolated variable with direct hex code */}
            <h3 className={`text-2xl font-bold text-[#5A0F19] mb-8 flex items-center`}>
                <Key className="w-5 h-5 mr-3" /> Report Credentials
            </h3>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                
                {/* Full Name */}
                <div>
                    {/* FIX: Replaced interpolated variable with direct hex code */}
                    <label htmlFor="name" className={`block text-sm font-medium text-[#1A1A1A] mb-2`}>Full Name (Exactly as per records)</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        value={credentials.name}
                        onChange={handleChange}
                        className={InputClasses}
                        placeholder="E.g., Jane P. Banda"
                    />
                </div>

                {/* Candidate Number */}
                <div>
                    {/* FIX: Replaced interpolated variable with direct hex code */}
                    <label htmlFor="candidateNumber" className={`block text-sm font-medium text-[#1A1A1A] mb-2`}>Student's Number</label>
                    <input 
                        type="text" 
                        id="candidateNumber" 
                        name="candidateNumber" 
                        required 
                        value={credentials.candidateNumber}
                        onChange={handleChange}
                        className={InputClasses}
                        placeholder="Enter students number given by Aministration"
                    />
                </div>
                
                {/* Form and Term Dropdowns */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        {/* FIX: Replaced interpolated variable with direct hex code */}
                        <label htmlFor="formLevel" className={`block text-sm font-medium text-[#1A1A1A] mb-2`}>Form Level</label>
                        <div className="relative">
                            <select 
                                id="formLevel" 
                                name="formLevel" 
                                required 
                                value={credentials.formLevel}
                                onChange={handleChange}
                                className={InputClasses + ' appearance-none pr-10'}
                            >
                                {['Form 1', 'Form 2', 'Form 3', 'Form 4'].map(f => <option key={f} value={f}>{f}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                    </div>
                    
                    <div>
                        <div>
                            {/* FIX: Replaced interpolated variable with direct hex code */}
                            <label htmlFor="term" className={`block text-sm font-medium text-[#1A1A1A] mb-2`}>Academic Term</label>
                            <div className="relative">
                                <select 
                                    id="term" 
                                    name="term" 
                                    required 
                                    value={credentials.term}
                                    onChange={handleChange}
                                    className={InputClasses + ' appearance-none pr-10'}
                                >
                                    {['Term 1', 'Term 2', 'Term 3'].map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <motion.button 
                    type="submit" 
                    disabled={isSubmitting}
                    whileTap={{ scale: 0.98 }} 
                    // FIX: Replaced interpolated variable with direct hex code
                    className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 relative overflow-hidden mt-8 
                    ${isSubmitting 
                        // FIX: Replaced interpolated variable with direct hex code
                        ? `bg-[#5A0F19] opacity-70 cursor-not-allowed` 
                        // FIX: Replaced interpolated variable with direct hex code
                        : `bg-[#5A0F19] text-white shadow-lg hover:bg-[#7A1F2B]`
                    }`}
                >
                    <AnimatePresence mode="wait">
                        {isSubmitting ? (
                            <motion.span 
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center justify-center"
                            >
                                <Loader className="w-5 h-5 mr-3 animate-spin text-white" />
                                Fetching your report...
                            </motion.span>
                        ) : (
                            <motion.span 
                                key="view"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center justify-center"
                            >
                                View Report <BookOpen className="w-5 h-5 ml-2" />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>
            </form>
        </motion.div>
    );
};

const ErrorBox = ({ message }) => (
    <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        // FIX: Replaced interpolated variable with direct hex code
        className={`p-6 bg-[#F7EDEE] border border-[#5A0F19]/60 rounded-xl text-[#1A1A1A] shadow-md`}
    >
        <div className="flex items-start">
            <XCircle className="w-6 h-6 mr-3 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
                <h4 className="font-bold text-lg mb-2">Authentication Failed</h4>
                <p className="text-sm">{message}</p>
                <p className="text-sm mt-3 font-semibold">
                    Please verify your information or contact the administration office for assistance.
                </p>
            </div>
        </div>
    </motion.div>
);

const ReportPreview = ({ data }) => (
    <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="mt-12 space-y-6"
    >
        {/* FIX: Replaced interpolated variable with direct hex code */}
        <h2 className={`text-4xl font-bold text-[#5A0F19] font-['Outfit']`}>
            Your Official Term Report
        </h2>
        
        {/* Report Metadata */}
        {/* FIX: Replaced interpolated variable with direct hex code */}
        <div className="flex justify-between p-4 bg-[#F6F6F6] rounded-lg text-sm border-l-4 border-[#7A1F2B]">
            <p><strong>Student:</strong> {data.studentName}</p>
            <p><strong>Form:</strong> {data.form}</p>
            <p><strong>Term:</strong> {data.term}</p>
            <p><strong>Date:</strong> {data.date}</p>
        </div>

        {/* Embedded PDF Viewer Placeholder */}
        {/* FIX: Replaced interpolated variable with direct hex code */}
        <div className={`aspect-[4/3] w-full bg-white border border-[#C6C6C6] shadow-lg rounded-lg overflow-hidden`}>
            {/* FIX: Replaced interpolated variable with direct hex code */}
            <div className={`h-full w-full bg-[#F6F6F6] flex flex-col items-center justify-center p-8`}>
                {/* FIX: Replaced interpolated variable with direct hex code */}
                <BookOpen className={`w-12 h-12 text-[#7A1F2B] mb-4`} />
                {/* FIX: Replaced interpolated variable with direct hex code */}
                <p className={`text-2xl font-bold text-[#1A1A1A]`}>Placeholder Report PDF</p>
                <p className="text-gray-600 mt-2">
                    Official Grade: <span className="font-extrabold text-2xl text-green-700">{data.mockGrade}</span>
                </p>
                <p className="text-sm mt-4 text-center">
                    This scrollable area represents the official PDF viewer. (Page 1 of 4)
                </p>
            </div>
        </div>

        {/* Download Button & Security Note */}
        <div className="flex justify-between items-center mt-6">
            <motion.button
                whileTap={{ scale: 0.95, boxShadow: "0 0 0 rgba(0,0,0,0)" }}
                // FIX: Replaced interpolated variable with direct hex code
                className={`py-3 px-8 text-white font-semibold rounded-xl bg-[#5A0F19] shadow-md hover:bg-[#7A1F2B] transition-all duration-300 flex items-center`}
            >
                <Download className="w-5 h-5 mr-2" /> Download Report (PDF)
            </motion.button>
            
            {/* FIX: Replaced interpolated variable with direct hex code */}
            <p className={`text-sm text-[#1A1A1A]/70 italic flex items-center`}>
                <Lock className="w-4 h-4 mr-1 text-gray-500" /> Keep your candidate number secure at all times.
            </p>
        </div>
    </motion.div>
);

const SupportSection = () => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={FADE_UP_VARIANT}
        // FIX: Replaced interpolated variable with direct hex code
        className="mt-20 border-t border-[#C6C6C6] pt-8"
    >
        {/* FIX: Replaced interpolated variable with direct hex code */}
        <h3 className={`text-3xl font-bold text-[#1A1A1A] mb-6`}>Need Help Retrieving Your Report?</h3>
        
        {/* Staggered animation added to the grid */}
        <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={STAGGER_CONTAINER_VARIANT}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            {/* Card 1 */}
            <motion.div 
                variants={FADE_UP_VARIANT}
                className={`p-6 bg-white rounded-xl shadow-md transition-shadow hover:shadow-lg`}
            >
                {/* FIX: Replaced interpolated variable with direct hex code */}
                <Mail className={`w-6 h-6 text-[#7A1F2B] mb-2`} />
                <h4 className="font-semibold text-lg">NCE Results Office</h4>
                {/* FIX: Replaced interpolated variable with direct hex code */}
                <a href="mailto:results@schoolname.mw" className={`text-[#5A0F19] hover:underline text-sm`}>
                    results@nce.mw
                </a>
            </motion.div>
            
            {/* Card 2 */}
            <motion.div 
                variants={FADE_UP_VARIANT}
                className={`p-6 bg-white rounded-xl shadow-md transition-shadow hover:shadow-lg`}
            >
                {/* FIX: Replaced interpolated variable with direct hex code */}
                <Phone className={`w-6 h-6 text-[#7A1F2B] mb-2`} />
                <h4 className="font-semibold text-lg">Direct Phone Line</h4>
                <p className="text-gray-700 text-sm">+265995312539</p>
            </motion.div>
            
            {/* Card 3 */}
            <motion.div 
                variants={FADE_UP_VARIANT}
                className={`p-6 bg-white rounded-xl shadow-md transition-shadow hover:shadow-lg`}
            >
                {/* FIX: Replaced interpolated variable with direct hex code */}
                <ExternalLink className={`w-6 h-6 text-[#7A1F2B] mb-2`} />
                <h4 className="font-semibold text-lg">Portal Guide</h4>
                {/* FIX: Replaced interpolated variable with direct hex code */}
                <a href="/portal-faq" className={`text-[#5A0F19] hover:underline text-sm`}>
                    View Step-by-Step Instructions
                </a>
            </motion.div>
        </motion.div>
    </motion.div>
);

// =================================================================
// 4. MAIN APP COMPONENT (Renamed from ResultsPortal)
// =================================================================

const App = () => {
    // status: 'initial', 'loading', 'success', 'error'
    const [reportStatus, setReportStatus] = useState('initial');
    const [reportData, setReportData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    return (
        // FIX: Replaced interpolated variable with direct hex code
        <div className={`min-h-screen bg-[#F6F6F6] font-['Inter'] text-[#1A1A1A]`}>
            <Navbar activePage="/results-portal" />
            
            <main className="max-w-4xl mx-auto px-6 py-16">
                
                {/* 1. HERO SECTION */}
                <motion.section 
                    initial="hidden" 
                    animate="visible" 
                    variants={FADE_UP_VARIANT}
                    className="text-center mb-12 relative"
                >
                    {/* FIX: Replaced interpolated variable with direct hex code */}
                    <h1 className={`text-5xl md:text-6xl font-extrabold text-[#5A0F19] font-['Outfit'] leading-tight`}>
                        Access Your Academic Results
                    </h1>
                    <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: '100%' }} 
                        transition={{ delay: 0.5, duration: 1.0 }} 
                        // FIX: Replaced interpolated variable with direct hex code
                        className={`h-1 bg-[#7A1F2B] mx-auto mt-4 max-w-lg`}
                    />
                    {/* FIX: Replaced interpolated variable with direct hex code */}
                    <p className={`mt-6 text-xl text-[#1A1A1A]/80 max-w-3xl mx-auto`}>
                        Retrieve your official term report by entering your details EXACTLY as they appear on school records below.
                    </p>
                </motion.section>

                {/* 2 & 3. FORM AND ERROR/SUCCESS VIEWS */}
                <CredentialsForm 
                    setReportStatus={setReportStatus} 
                    setReportData={setReportData}
                    setErrorMessage={setErrorMessage}
                />
                
                <AnimatePresence>
                    {reportStatus === 'error' && errorMessage && (
                        <motion.div key="error" className="mt-8">
                            <ErrorBox message={errorMessage} />
                        </motion.div>
                    )}

                    {reportStatus === 'success' && reportData && (
                        <motion.div key="success" className="mt-8">
                            <ReportPreview data={reportData} />
                        </motion.div>
                    )}                   
                </AnimatePresence>

                {/* 6. Help & Support */}
                <SupportSection />
                
            </main>

            <Footer />
        </div>
    );
};

export default App;