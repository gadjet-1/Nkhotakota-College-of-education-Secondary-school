"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Users, Microscope, BookOpen, MessageCircle, Globe, Mail, Phone, Facebook, Instagram, Zap, Shield, MapPin, Search, ChevronRight } from 'lucide-react';

import Navbar from "@/components/header";
import Footer from "@/components/footer";

// =================================================================
// ⚠️ SHARED COMPONENTS (NAVBAR & FOOTER)
// =================================================================


// =================================================================
// FRAMER MOTION VARIANTS & UTILITIES
// =================================================================

const FADE_UP_VARIANT = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.33, 1, 0.68, 1]
        }
    }
};

// Staggered Animation Wrapper for Grid
const STAGGER_CONTAINER = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Time delay between each card appearing
            delayChildren: 0.1
        }
    }
};

// Springy Card Animation
const CARD_VARIANT = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 12
        }
    }
};

// =================================================================
// STAFF DIRECTORY DATA
// =================================================================

const staffData = [
    // --- LEADERSHIP ---
    { name: "Mr. Mfaume Kaise", title: "DIRECTOR", department: "Leadership", image:"/assets/images/jekap.jpg", bio: "Leading the academy towards educational excellence and institutional growth." },
    { name: "Mr. Kaombe Ambali", title: "HEAD TEACHER (Academics)", department: "Leadership", image: "/assets/images/head.jpg", bio: "Overseeing curriculum development, teaching quality, and academic standards." },
    { name: "Mr. Kamtunda Musa", title: "DEPUTY HEAD TEACHER (Academics)", department: "Leadership", image: "/assets/images/king.jpg", bio: "Overseeing curriculum development, teaching quality, and academic standards." },
    // --- ADVISORY BOARD ---
    { name: "Mr. king Banda", title: "BOARDING MASTER", department: "advisory", image: "/assets/images/king.jpg" },
    { name: "Mr. JEKAPU MUWANDA", title: "BOARDING MASTER", department: "Advisory", image: "/assets/images/jekapu.jpg" },

    // --- TEACHING STAFF: SCIENCES ---
    { name: "Dr. Henry Mark", title: "Head of Science Dept.", department: "Sciences", subject: "Physics", image: "/assets/images/henry.jpg" },
    { name: "Mrs. Zikomo Phiri", title: "Senior Teacher", department: "Sciences", subject: "Biology", image: "https://images.unsplash.com/photo-1596752009249-1667b93a0273?q=80&w=600&h=600&fit:crop" },
    { name: "Dr. James Sakala", title: "Teacher", department: "Sciences", subject: "Chemistry", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&h=600&fit:crop" },
    
    // --- TEACHING STAFF: HUMANITIES ---
    { name: "Dr. Chisomo Tembo", title: "Head of Humanities Dept.", department: "Humanities", subject: "History", image: "https://images.unsplash.com/photo-1582218947690-e7f1e7f6e2f1?q=80&w=600&h=600&fit:crop" },
    { name: "Ms. Ndeye Manda", title: "Teacher", department: "Humanities", subject: "Geography", image: "https://images.unsplash.com/photo-1560250097-f13c6a4a0889?q=80&w=600&h=600&fit:crop" },
    
    // --- TEACHING STAFF: LANGUAGES ---
    { name: "Mr. Hastings Soko", title: "Head of Languages Dept.", department: "Languages", subject: "English Literature", image: "https://images.unsplash.com/photo-1549495864-42f360706214?q=80&w=600&h=600&fit:crop" },
    { name: "Mrs. Chikondi Jere", title: "Teacher", department: "Languages", subject: "Chichewa", image: "https://images.unsplash.com/photo-1524250280261-1e9d99846ff9?q=80&w=600&h=600&fit:crop" },
    
    // --- SUPPORT STAFF ---
    { name: "Ms. Janet Mwale", title: "Librarian", department: "Support", image: "/assets/images/cook" },
    { name: "Ms. Janet Mwale", title: "Librarian", department: "Support", image: "/assets/images/" },
    { name: "Ms. Janet Mwale", title: "Librarian", department: "Support", image: "/assets/images/" },
    { name: "Ms. Janet Mwale", title: "Librarian", department: "Support", image: "/assets/images/" },
    { name: "Ms. Janet Mwale", title: "Librarian", department: "Support", image: "/assets/images/" },

];


// =================================================================
// SEARCH BAR COMPONENT
// =================================================================
const SearchBar = ({ searchTerm, onSearchChange }) => (
    <motion.div 
        className="max-w-4xl mx-auto px-6 mt-16 mb-16 relative z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
    >
        <div className="relative w-full mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[#1E3A8A]" />
            <input
                type="text"
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full p-5 pl-16 pr-6 text-xl bg-white border border-gray-200 rounded-full shadow-lg focus:ring-4 focus:ring-[#F5C542]/50 focus:border-[#F5C542] transition duration-300 outline-none placeholder:text-gray-400"
            />
        </div>
    </motion.div>
);

// =================================================================
// NEW STAFF CARD COMPONENT 
// (Vertical Layout Always: Photo -> Description -> Icons)
// =================================================================
const StaffCard = ({ staff }) => (
    <motion.div 
        variants={CARD_VARIANT}
        className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col h-full"
    >
        {/* Force Vertical Column Layout (flex-col) on ALL screens */}
        <div className="flex flex-col h-full">
            
            {/* Image Section - Full Width, Fixed Height */}
            <div className="w-full h-80 relative overflow-hidden bg-gray-100 shrink-0">
                <motion.img
                    src={staff.image}
                    alt={staff.name}
                    className="w-full h-full object-cover object-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x600/1E3A8A/F8F7F2?text=Staff+Photo"; }}
                />
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between text-left">
                <div>
                    <h3 className="text-2xl font-bold text-[#1E3A8A] font-['Outfit'] mb-2">{staff.name}</h3>
                    
                    <div className="flex items-center space-x-2 mb-4">
                        <span className="h-0.5 w-8 bg-[#F5C542]"></span>
                        <p className="text-sm font-semibold text-[#0A1A2F] uppercase tracking-wide">{staff.title}</p>
                    </div>

                    {staff.subject && (
                        <div className="inline-block bg-blue-50 text-[#1E3A8A] px-3 py-1 rounded-lg text-xs font-medium mb-4">
                            Subject: {staff.subject}
                        </div>
                    )}
                    
                    {staff.bio && (
                        <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                            {staff.bio}
                        </p>
                    )}
                </div>
                
                {/* Social Icons */}
                <div className="flex space-x-6 pt-6 border-t border-gray-100 mt-auto">
                    <a href="#" className="group flex items-center space-x-2 text-gray-400 hover:text-[#25D366] transition-colors">
                        <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
                    </a>
                    <a href="#" className="group flex items-center space-x-2 text-gray-400 hover:text-[#1877F2] transition-colors">
                        <Facebook className="w-5 h-5" strokeWidth={1.5} />
                    </a>
                    <a href="#" className="group flex items-center space-x-2 text-gray-400 hover:text-[#E1306C] transition-colors">
                        <Instagram className="w-5 h-5" strokeWidth={1.5} />
                    </a>
                </div>
            </div>
        </div>
    </motion.div>
);

// =================================================================
// DEPARTMENT SECTION COMPONENT
// =================================================================
const DepartmentSection = ({ title, icon: Icon, staff }) => {
    if (staff.length === 0) return null;

    return (
        <motion.div 
            className="mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "-100px" }}
            variants={STAGGER_CONTAINER}
        >
            <div className="flex items-center justify-center mb-12">
                <div className="bg-white p-4 rounded-full shadow-md mr-4">
                    <Icon className="w-8 h-8 text-[#1E3A8A]" />
                </div>
                <h2 className="text-4xl font-bold text-[#0A1A2F] font-['Outfit']">
                    {title}
                </h2>
            </div>
            
            {/* ⚠️ LAYOUT:
               - Small/Medium: grid-cols-1 (One at a time)
               - Large: lg:grid-cols-3 (Three at a time, Inline)
            */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-8 lg:gap-10">
                {staff.map((person, index) => (
                    <StaffCard key={index} staff={person} />
                ))}
            </div>
        </motion.div>
    );
};


// =================================================================
// MAIN STAFF DIRECTORY PAGE COMPONENT
// =================================================================
const StaffDirectoryPage = () => {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStaff, setFilteredStaff] = useState(staffData);

    // Filtering Logic
    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredStaff(staffData);
            return;
        }

        const lowerCaseSearch = searchTerm.toLowerCase();

        const results = staffData.filter(staff => {
            return (
                staff.name.toLowerCase().includes(lowerCaseSearch) ||
                staff.title.toLowerCase().includes(lowerCaseSearch) ||
                staff.department.toLowerCase().includes(lowerCaseSearch) ||
                (staff.subject && staff.subject.toLowerCase().includes(lowerCaseSearch)) ||
                (staff.bio && staff.bio.toLowerCase().includes(lowerCaseSearch))
            );
        });
        setFilteredStaff(results);
    }, [searchTerm]);

    // Filter staff into their respective groups based on the current filtered list
    const currentLeadershipStaff = filteredStaff.filter(s => s.department === 'Leadership');
    const currentAdvisoryStaff = filteredStaff.filter(s => s.department === 'Advisory');
    const currentSciencesStaff = filteredStaff.filter(s => s.department === 'Sciences');
    const currentHumanitiesStaff = filteredStaff.filter(s => s.department === 'Humanities');
    const currentLanguagesStaff = filteredStaff.filter(s => s.department === 'Languages');
    const currentSupportStaff = filteredStaff.filter(s => s.department === 'Support');
    
    const academicDepartments = [
        { title: "Sciences", icon: Microscope, staff: currentSciencesStaff },
        { title: "Humanities", icon: BookOpen, staff: currentHumanitiesStaff },
        { title: "Languages", icon: Globe, staff: currentLanguagesStaff },
    ];
    
    return (
        <div className="min-h-screen bg-[#F8F7F2] font-['Inter'] text-[#111827]">
            <Navbar />
            
            <main>
                
                {/* 1. Hero Title Section */}
                <section className="relative h-[40vh] flex items-center justify-center text-center bg-[#1E3A8A] overflow-hidden rounded-b-[3rem] shadow-2xl">
                    <motion.div 
                        className="absolute inset-0 opacity-10 bg-cover bg-center" 
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543269865-c359d997d913?q=80&w=2070&auto=format&fit=crop')" }}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                    />
                    <div className="relative z-10 max-w-4xl px-6">
                        <motion.div 
                            initial="hidden" 
                            animate="visible" 
                            variants={FADE_UP_VARIANT} 
                            transition={{ duration: 1.0 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-extrabold text-[#F5C542] font-['Outfit'] leading-tight drop-shadow-lg">
                                Our Team
                            </h1>
                            <p className="mt-4 text-xl text-white/90 max-w-2xl mx-auto">
                                The dedicated educators and leaders shaping the future.
                            </p>
                        </motion.div>
                    </div>
                </section>
                
                {/* 2. Search Bar Integration */}
                <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

                {/* 3. Filtered Staff Display (If searching) or Philosophy (If not searching) */}
                {!searchTerm.trim() ? (
                    /* Staff Philosophy Section */
                    <section className="pb-20 px-6">
                        <div className="max-w-3xl mx-auto text-center p-8 border border-[#F5C542]/30 rounded-3xl bg-white shadow-sm">
                            <motion.div 
                                initial="hidden" 
                                whileInView="visible" 
                                viewport={{ once: true, amount: 0.4 }}
                                variants={FADE_UP_VARIANT}
                            >
                                <Zap className="w-8 h-8 text-[#F5C542] mx-auto mb-4" />
                                <h2 className="text-2xl font-bold font-['Outfit'] mb-3 text-[#1E3A8A]">
                                    Our Philosophy
                                </h2>
                                <p className="text-base text-gray-600">
                                    We are more than educators; we are mentors. Our team is committed to fostering academic achievement and strong ethical character.
                                </p>
                            </motion.div>
                        </div>
                    </section>
                ) : (
                    /* Search Results Display */
                    <section className="py-10 px-6">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex items-center justify-center mb-10 border-b border-gray-200 pb-4 max-w-3xl mx-auto">
                                <h2 className="text-2xl font-bold text-[#0A1A2F] font-['Outfit']">
                                    Found {filteredStaff.length} Result{filteredStaff.length !== 1 && 's'}
                                </h2>
                            </div>
                            
                            {filteredStaff.length > 0 ? (
                                <motion.div 
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                    initial="hidden"
                                    animate="visible"
                                    variants={STAGGER_CONTAINER}
                                >
                                    {filteredStaff.map((person, index) => (
                                        <StaffCard key={index} staff={person} />
                                    ))}
                                </motion.div>
                            ) : (
                                <p className="text-center text-xl text-gray-600 mt-10">
                                    No staff members found matching "{searchTerm}".
                                </p>
                            )}
                        </div>
                    </section>
                )}


                {/* 4. Directory Sections (Only show when not actively searching) */}
                {!searchTerm.trim() && (
                    <div className="space-y-12">
                        {/* Leadership */}
                        <section className="px-6">
                            <div className="max-w-7xl mx-auto">
                                <DepartmentSection 
                                    title="Leadership" 
                                    icon={Shield} 
                                    staff={currentLeadershipStaff} 
                                />
                            </div>
                        </section>

                        {/* Advisory */}
                        <section className="px-6 bg-white py-12 rounded-3xl shadow-inner max-w-7xl mx-auto mb-16">
                            <DepartmentSection 
                                title="Advisory Board" 
                                icon={Users} 
                                staff={currentAdvisoryStaff} 
                            />
                        </section>

                        {/* Academic Departments */}
                        <section className="px-6">
                            <div className="max-w-7xl mx-auto">
                                {academicDepartments.map((dept) => (
                                    <DepartmentSection 
                                        key={dept.title}
                                        title={dept.title} 
                                        icon={dept.icon} 
                                        staff={dept.staff} 
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Support Staff */}
                        <section className="px-6 pb-20">
                            <div className="max-w-7xl mx-auto">
                                <DepartmentSection 
                                    title="Support & Admin" 
                                    icon={Phone} 
                                    staff={currentSupportStaff} 
                                />
                            </div>
                        </section>
                    </div>
                )}


                {/* 8. Campus Map & Directions */}
                <section className="py-20 px-6 bg-[#0A1A2F] text-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <MapPin className="w-12 h-12 text-[#F5C542] mx-auto mb-6" />
                        <h2 className="text-4xl font-bold mb-6 font-['Outfit']">
                            Find Us on Campus
                        </h2>
                        <p className="text-xl text-gray-300 mb-10">
                            Our main administrative building is located centrally.
                        </p>
                        
                        <div className="bg-white/10 w-full h-80 rounded-2xl border border-white/20 flex items-center justify-center">
                            <span className="text-white/50 font-medium">Map Interface Placeholder</span>
                        </div>
                    </div>
                </section>
                
                {/* 9. Contact CTA */}
                <section className="py-16 px-6 bg-[#F5C542]">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-[#0A1A2F] mb-6 font-['Outfit']">
                            Join Our Team or Get in Touch
                        </h2>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a href="mailto:hr@academy.edu" className="bg-[#0A1A2F] text-white px-8 py-3 rounded-xl font-bold hover:bg-opacity-90 transition">
                                Email HR Dept
                            </a>
                            <a href="/contact" className="bg-white text-[#0A1A2F] px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition">
                                General Inquiries
                            </a>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
};

export default StaffDirectoryPage;