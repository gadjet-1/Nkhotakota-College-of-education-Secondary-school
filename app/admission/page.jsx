"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { CheckCircle, Zap, BookOpen, GraduationCap, DollarSign, Download, Phone, Mail, FileText, ArrowRight, MapPin } from 'lucide-react';

// =================================================================
// ⚠️ PLACEHOLDER COMPONENTS (NAVBAR & FOOTER)
// In a real Next.js app, these would be separate, imported components.
// We define them here to meet the single-file constraint.
// =================================================================

const Navbar = () => (
    <nav className="sticky top-0 z-50 bg-[#0A1A2F] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <span className="text-2xl font-bold text-[#F5C542] font-['Outfit']">ACADEMY</span>
            <div className="text-sm text-[#F8F7F2] space-x-6 hidden md:flex">
                <a href="/" className="hover:text-[#F5C542] transition">Home</a>
                <a href="/admissions" className="border-b-2 border-[#F5C542] text-[#F5C542] transition">Admissions</a>
                <a href="/curriculum" className="hover:text-[#F5C542] transition">Curriculum</a>
            </div>
            <button className="text-[#F5C542] border border-[#F5C542] px-4 py-1 rounded-xl text-sm hover:bg-[#F5C542] hover:text-[#0A1A2F] transition-all duration-300"
                onClick={() => console.log('Login clicked')}
            >
                Log In
            </button>
        </div>
    </nav>
);

const Footer = () => (
    <footer className="bg-[#111827] text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-[#E5E7EB]">
            © {new Date().getFullYear()} Academy. All Rights Reserved. | Lilongwe, Malawi
        </div>
    </footer>
);

// =================================================================
// FRAMER MOTION VARIANTS & ANIMATION UTILITY
// Define reusable animation styles globally.
// =================================================================

// Variant for primary elements fading up (used for titles and large sections)
const FADE_UP_VARIANT = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.33, 1, 0.68, 1] // Custom cubic-bezier for a premium, smooth start
        }
    }
};

// Variant for elements that slide in from the left (used for lists/requirements)
const FADE_LEFT_VARIANT = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

// Container variant to initiate staggered children animation
const STAGGER_CONTAINER_VARIANT = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15, // Delay between each child item's animation start
        },
    },
};

// Item variant used inside a staggered container (fades up slightly)
const STAGGER_ITEM = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

/**
 * Custom React hook component for animating elements into view on scroll.
 * Uses useInView to trigger animation controls only once.
 */
const AnimateOnScroll = ({ children, variants, threshold = 0.3 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: threshold });
    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={controls}
            // Use whileInView and viewport for the main section containers for performance
            // But use the custom hook for controlled, staggered/complex animations
        >
            {children}
        </motion.div>
    );
};

// Primary Button component with hover scale and shadow increase animation
const PrimaryButton = ({ children, className = '', icon: Icon, href = '#' }) => (
    <motion.a
        href={href}
        className={`inline-flex items-center justify-center px-8 py-3 font-semibold text-[#0A1A2F] bg-[#F5C542] rounded-xl shadow-lg transition-colors duration-300 ${className}`}
        // Subtle scale and prominent shadow on hover
        whileHover={{ scale: 1.05, boxShadow: "0 15px 25px -5px rgba(245, 197, 66, 0.4), 0 6px 10px -3px rgba(245, 197, 66, 0.1)" }}
        whileTap={{ scale: 0.98 }}
    >
        {Icon && <Icon className="w-5 h-5 mr-2" />}
        {children}
    </motion.a>
);

// Secondary Button component with elegant color swap on hover
const SecondaryButton = ({ children, className = '', icon: Icon, href = '#' }) => (
    <motion.a
        href={href}
        className={`inline-flex items-center justify-center px-8 py-3 font-semibold text-[#F5C542] border-2 border-[#F5C542] rounded-xl transition-colors duration-300 ${className}`}
        whileHover={{ backgroundColor: "#F5C542", color: "#0A1A2F", scale: 1.05, boxShadow: "0 10px 15px -3px rgba(245, 197, 66, 0.5)" }}
        whileTap={{ scale: 0.98 }}
    >
        {Icon && <Icon className="w-5 h-5 mr-2" />}
        {children}
    </motion.a>
);


// =================================================================
// MAIN ADMISSIONS PAGE COMPONENT
// =================================================================
const AdmissionsPage = () => {

    const requirements = [
        "Completion of Primary School Certificate of Education (PSCE) or equivalent.",
        "A minimum aggregate of 6 points for entry into Form 1 (Highly competitive standard).",
        "Successful completion of the Chimwawa Academy Entrance Examination.",
        "Clean academic record and behavioral assessment from the previous school.",
        "Submission of a fully completed application form and all required documents.",
    ];

    const steps = [
        { icon: FileText, title: "Step 1: Form Submission", description: "Download and complete the application form and submit it with required documents (PSCE results, birth certificate, photos, etc.)." },
        { icon: BookOpen, title: "Step 2: Entrance Examination", description: "Candidates must sit for the competitive entrance exam in English, Mathematics, and Science. Scores determine eligibility." },
        { icon: DollarSign, title: "Step 3: Interview & Offer", description: "Shortlisted candidates and parents/guardians attend an interview with the academic board. Provisional offers are issued." },
        { icon: CheckCircle, title: "Step 4: Enrollment Confirmation", description: "Secure your place by paying the non-refundable acceptance fee within the specified deadline to finalize enrollment." },
    ];
    
    const whyEnrollCards = [
        { icon: GraduationCap, title: "Academic Excellence", description: "Consistent top-tier performance in JCE and MSCE examinations, driven by our rigorous curriculum." },
        { icon: Zap, title: "Holistic Development", description: "Programs focused on developing character, leadership, and ethical behavior alongside intellectual growth." },
        { icon: BookOpen, title: "Dedicated Faculty", description: "A team of highly qualified, experienced, and dedicated educators committed to student success." },
    ];

    return (
        <div className="min-h-screen bg-[#F8F7F2] font-['Inter'] text-[#111827]">
            <Navbar />
            
            <main>
                
                {/* 1. Hero Banner */}
                <section className="relative h-[65vh] flex items-center justify-center text-center bg-[#0A1A2F] overflow-hidden rounded-b-xl shadow-2xl">
                    {/* Background image for a premium academic feel */}
                    <div className="absolute inset-0 opacity-20 bg-cover bg-center" 
                        style={{ 
                            backgroundImage: "url('/assets/images/hero1.jpg')" 
                        }}>
                    </div>
                    <div className="relative z-10 max-w-4xl px-6">
                        {/* Title with Fade Up animation */}
                        <AnimateOnScroll variants={FADE_UP_VARIANT} threshold={0.1}>
                            <h1 className="text-6xl md:text-8xl font-extrabold text-[#F5C542] font-['Outfit'] leading-tight drop-shadow-lg">
                                Admissions
                            </h1>
                            <p className="mt-4 text-xl text-white/90">
                                Join a community dedicated to discipline, excellence, and future leadership.
                            </p>
                        </AnimateOnScroll>
                    </div>
                </section>

                {/* 2. Admissions Overview */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                        {/* Text Content (Fades in from the left) */}
                        <AnimateOnScroll variants={FADE_LEFT_VARIANT}>
                            <h2 className="text-4xl font-bold text-[#0A1A2F] mb-4 font-['Outfit']">
                                The Path to Academic Excellence
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Our admissions process is designed to identify students who are ready for a challenging academic environment and committed to personal growth. We seek ambitious young men and women who demonstrate a strong desire for learning and a commitment to our values.
                            </p>
                            <p className="text-lg text-gray-600 border-l-4 border-[#F5C542] pl-4 italic font-medium">
                                Applications for the upcoming academic year open in **October** and close in **November**. Ensure timely submission.
                            </p>
                        </AnimateOnScroll>
                        
                        {/* Image (Fades up) */}
                        <AnimateOnScroll variants={FADE_UP_VARIANT}>
                            <img 
                                src="/assets/images/class.jpg" 
                                alt="Students studying in a classic library setting" 
                                className="w-full h-auto object-cover rounded-xl shadow-lg shadow-gray-300/30"
                                onError={(e) => { e.target.onerror = null; e.target.src="/assets/images/classes.jpg"; }}
                            />
                        </AnimateOnScroll>
                    </div>
                </section>

                {/* 3. Why Enroll With Us (Animated Cards - Staggered Fade Up) */}
                <section className="py-20 px-6 bg-[#E5E7EB]">
                    <div className="max-w-7xl mx-auto">
                        <AnimateOnScroll variants={FADE_UP_VARIANT} threshold={0.2}>
                            <h2 className="text-4xl font-bold text-[#1E3A8A] mb-12 text-center font-['Outfit']">
                                Why Choose Our Academy?
                            </h2>
                        </AnimateOnScroll>
                        <motion.div 
                            className="grid md:grid-cols-3 gap-8"
                            variants={STAGGER_CONTAINER_VARIANT}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.4 }}
                        >
                            {whyEnrollCards.map((card, index) => (
                                <motion.div 
                                    key={index}
                                    className="bg-white p-8 rounded-xl shadow-md shadow-gray-300/30 border border-gray-200"
                                    variants={STAGGER_ITEM} // Individual item animation
                                    // Subtle lift and shadow increase on hover
                                    whileHover={{ scale: 1.03, boxShadow: "0 20px 25px -5px rgba(17, 24, 39, 0.1), 0 8px 10px -6px rgba(17, 24, 39, 0.05)" }} 
                                >
                                    <card.icon className="w-10 h-10 text-[#F5C542] mb-4" />
                                    <h3 className="text-2xl font-bold text-[#0A1A2F] mb-3 font-['Outfit']">{card.title}</h3>
                                    <p className="text-gray-600">{card.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* 4. Admissions Requirements (Staggered Fade Left List) */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <AnimateOnScroll variants={FADE_UP_VARIANT} threshold={0.2}>
                            <h2 className="text-4xl font-bold text-[#0A1A2F] mb-12 text-center font-['Outfit']">
                                Key Entry Requirements
                            </h2>
                        </AnimateOnScroll>
                        <motion.ul 
                            className="max-w-3xl mx-auto space-y-6"
                            variants={STAGGER_CONTAINER_VARIANT}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            {requirements.map((req, index) => (
                                <motion.li 
                                    key={index}
                                    className="flex items-start p-4 bg-white rounded-xl border-l-4 border-[#1E3A8A] shadow-md shadow-gray-300/30 transition duration-300 hover:border-[#F5C542]"
                                    variants={FADE_LEFT_VARIANT} // Fade-left on requirements
                                >
                                    <CheckCircle className="w-6 h-6 text-[#F5C542] mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-lg text-gray-700">{req}</span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>
                </section>

                {/* 5. Step-by-step Admissions Process (Staggered List with Connector) */}
                <section className="py-20 px-6 bg-[#0A1A2F]">
                    <div className="max-w-7xl mx-auto">
                        <AnimateOnScroll variants={FADE_UP_VARIANT} threshold={0.2}>
                            <h2 className="text-4xl font-bold text-[#F8F7F2] mb-16 text-center font-['Outfit']">
                                The Four-Step Application Process
                            </h2>
                        </AnimateOnScroll>
                        <motion.div 
                            className="grid md:grid-cols-4 gap-8"
                            variants={STAGGER_CONTAINER_VARIANT}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.4 }}
                        >
                            {steps.map((step, index) => (
                                <motion.div 
                                    key={index} 
                                    className="relative p-8 bg-white rounded-xl shadow-2xl border-t-8 border-[#1E3A8A] hover:border-[#F5C542] transition-colors duration-300 h-full"
                                    variants={STAGGER_ITEM} // Individual item animation
                                >
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#F5C542] rounded-full flex items-center justify-center shadow-lg">
                                        <span className="text-xl font-bold text-[#0A1A2F]">{index + 1}</span>
                                    </div>
                                    <div className="mt-4">
                                        <step.icon className="w-8 h-8 text-[#1E3A8A] mb-4" />
                                        <h3 className="text-xl font-bold text-[#0A1A2F] mb-3 font-['Outfit']">{step.title}</h3>
                                        <p className="text-gray-600 text-sm">{step.description}</p>
                                    </div>
                                    {/* Arrow connector for desktop view */}
                                    {index < steps.length - 1 && (
                                        <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 hidden lg:block w-8 h-8 text-[#E5E7EB]" />
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
                
                {/* NEW SECTION: 6. Campus and Facilities Showcase */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <AnimateOnScroll variants={FADE_UP_VARIANT} threshold={0.2}>
                            <h2 className="text-4xl font-bold text-[#0A1A2F] mb-12 text-center font-['Outfit']">
                                Campus & Modern Facilities
                            </h2>
                        </AnimateOnScroll>
                        <div className="grid md:grid-cols-2 gap-10 items-center">
                            <AnimateOnScroll variants={FADE_LEFT_VARIANT}>
                                <img 
                                    src="/assets/images/boys around class.jpg" 
                                    alt="Modern computer lab and classroom" 
                                    className="w-full h-auto object-cover rounded-xl shadow-xl border border-gray-200"
                                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/1E3A8A/F8F7F2?text=Modern+Classroom"; }}
                                />
                            </AnimateOnScroll>
                            <AnimateOnScroll variants={FADE_UP_VARIANT}>
                                <div className="space-y-6">
                                    <p className="text-lg text-gray-700">
                                        We believe that the learning environment is critical to student success. Our campus features **state-of-the-art laboratories**, a fully stocked digital library, and dedicated sporting facilities.
                                    </p>
                                    <ul className="space-y-3 text-gray-600">
                                        <li className="flex items-center"><MapPin className="w-5 h-5 text-[#1E3A8A] mr-3 flex-shrink-0" /> **Modern Dormitories** with round-the-clock supervision.</li>
                                        <li className="flex items-center"><MapPin className="w-5 h-5 text-[#1E3A8A] mr-3 flex-shrink-0" /> **Advanced Science Labs** for practical instruction.</li>
                                        <li className="flex items-center"><MapPin className="w-5 h-5 text-[#1E3A8A] mr-3 flex-shrink-0" /> **Dedicated Arts & Innovation Studios**.</li>
                                    </ul>
                                    <SecondaryButton href="#" icon={ArrowRight}>Explore Campus Life</SecondaryButton>
                                </div>
                            </AnimateOnScroll>
                        </div>
                    </div>
                </section>


                {/* 7. Fees Overview (Clean Cards) - Now Section 6 */}
                <section className="py-20 px-6 bg-[#E5E7EB]">
                    <div className="max-w-7xl mx-auto">
                        <AnimateOnScroll variants={FADE_UP_VARIANT} threshold={0.2}>
                            <h2 className="text-4xl font-bold text-[#0A1A2F] mb-12 text-center font-['Outfit']">
                                School Fees and Financial Aid
                            </h2>
                        </AnimateOnScroll>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Card 1: Day Scholar Fees (Fade Left) */}
                            <AnimateOnScroll variants={FADE_LEFT_VARIANT}>
                                <div className="bg-white p-10 rounded-xl shadow-xl border border-gray-200 transition duration-300 hover:shadow-2xl">
                                    <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-100">
                                        <h3 className="text-3xl font-bold text-[#1E3A8A] font-['Outfit']">Day Scholars</h3>
                                        <DollarSign className="w-8 h-8 text-[#F5C542]" />
                                    </div>
                                    <p className="text-2xl font-bold text-[#0A1A2F] mb-4">MK 160,000 / Term</p>
                                    <ul className="space-y-3 text-gray-600 text-sm">
                                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-[#F5C542] mr-2" /> Includes tuition and academic resources.</li>
                                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-[#F5C542] mr-2" /> Lunch program available (optional supplement).</li>
                                    </ul>
                                    <PrimaryButton className="mt-8 w-full" href="#">View Fee Breakdown</PrimaryButton>
                                </div>
                            </AnimateOnScroll>

                            {/* Card 2: Boarding Fees (Fade Up) */}
                            <AnimateOnScroll variants={STAGGER_ITEM} threshold={0.5}>
                                <div className="bg-[#0A1A2F] text-white p-10 rounded-xl shadow-xl border border-gray-700 transition duration-300 hover:shadow-2xl">
                                    <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-700">
                                        <h3 className="text-3xl font-bold text-[#F5C542] font-['Outfit']">Boarding Scholars</h3>
                                        <GraduationCap className="w-8 h-8 text-[#F5C542]" />
                                    </div>
                                    <p className="text-2xl font-bold text-[#F8F7F2] mb-4">MK 540,000 / Term</p>
                                    <ul className="space-y-3 text-[#E5E7EB] text-sm">
                                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-[#F5C542] mr-2" /> Includes tuition, accommodation, and all meals.</li>
                                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-[#F5C542] mr-2" /> Supervised evening prep and mentorship.</li>
                                    </ul>
                                    <SecondaryButton className="mt-8 w-full border-white text-white hover:bg-[#F5C542] hover:text-[#0A1A2F]" href="#">Financial Aid Options</SecondaryButton>
                                </div>
                            </AnimateOnScroll>
                        </div>
                    </div>
                </section>

                {/* 8. Downloadable Forms Section - Now Section 7 */}
                <section className="py-20 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <AnimateOnScroll variants={FADE_UP_VARIANT} threshold={0.2}>
                            <h2 className="text-4xl font-bold text-[#0A1A2F] mb-6 font-['Outfit']">
                                Download Required Documents
                            </h2>
                            <p className="text-lg text-gray-600 mb-10">
                                Access the official application form and supplementary guides below.
                            </p>
                        </AnimateOnScroll>
                        
                        <div className="space-y-4">
                            {/* Download Links with hover animations */}
                            {[
                                { name: "Official Application Form 2024/2025 (PDF)", file: "Application_Form_2024.pdf" },
                                { name: "Admissions Requirements Checklist (PDF)", file: "Checklist_2024.pdf" },
                                { name: "School Fee Structure - Detailed (PDF)", file: "Fee_Structure_Detailed.pdf" },
                            ].map((doc, index) => (
                                <AnimateOnScroll 
                                    key={index} 
                                    variants={STAGGER_ITEM} // Individual item animation (fades up)
                                    threshold={0.6}
                                >
                                    <motion.a 
                                        href={`/downloads/${doc.file}`} 
                                        className="flex items-center justify-between p-5 bg-white rounded-xl shadow-md border border-gray-200 transition duration-300 text-left"
                                        whileHover={{ scale: 1.02, x: 5, boxShadow: "0 10px 15px -3px rgba(17, 24, 39, 0.1)" }} // Subtle scale and right shift
                                    >
                                        <span className="flex items-center text-lg font-medium text-[#0A1A2F]">
                                            <FileText className="w-6 h-6 text-[#1E3A8A] mr-4" />
                                            {doc.name}
                                        </span>
                                        <Download className="w-5 h-5 text-[#F5C542] group-hover:text-[#1E3A8A]" />
                                    </motion.a>
                                </AnimateOnScroll>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 9. CTA: Enroll Now + Contact Admissions - Now Section 8 */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto text-center p-12 bg-[#1E3A8A] rounded-xl shadow-2xl shadow-gray-400/50">
                        <AnimateOnScroll variants={FADE_UP_VARIANT} threshold={0.5}>
                            <h2 className="text-5xl font-extrabold text-[#F5C542] mb-4 font-['Outfit']">
                                Ready to Apply?
                            </h2>
                            <p className="text-xl text-white/90 mb-10">
                                Your journey towards academic excellence begins here. Click below to begin your application.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                                <PrimaryButton icon={ArrowRight} className="bg-[#F5C542] hover:bg-white transition duration-300">
                                    Start Application
                                </PrimaryButton>
                                <SecondaryButton icon={Phone} className="border-white text-white hover:bg-white hover:text-[#1E3A8A] hover:border-white transition duration-300">
                                    Contact Admissions Office
                                </SecondaryButton>
                            </div>
                        </AnimateOnScroll>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
};

export default AdmissionsPage;