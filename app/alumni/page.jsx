"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon, Globe, CheckCircle } from 'lucide-react';

// --- 1. BRAND IDENTITY & COLORS ---
const COLORS = {
  charcoal: '#1A1A1A', // Dark background for dark mode, dark text/elements
  teal: '#0D9488',     // Primary accent color
  navy: '#0A1A2F',     // Main background for dark mode
  cream: '#FAF7F2',    // Main background for light mode
  gold: '#F59E0B',     // Highlight accent color
};

// --- 2. TRANSLATIONS (English & Chichewa) ---
const translations = {
  en: {
    navbar: ['Home', 'About', 'Portfolio', 'Contact'],
    hero: {
      greeting: "Hello, I'm Gadjet.",
      title: 'Creative IT Student / Designer',
      viewPortfolio: 'View Portfolio',
      contactMe: 'Contact Me',
      description: "Blending technical expertise with high-end design to craft premium digital experiences.",
    },
    about: {
      title: 'About',
      biographyTitle: 'Short Biography',
      bioText: "I am an enthusiastic student pursuing a BSc in Information Technology at MUBAS, set to start in January. I combine my academic foundation with a passion for elegant design, specializing in creating user interfaces and web applications that are both beautiful and functional.",
      skillsTitle: 'My Skills',
      skills: ['UI/UX Design', 'Web Development', 'Graphic Design', 'Tools & Tech'],
      educationTitle: 'My Education',
      education: [
        {
          period: 'Jan 2024 - Present',
          title: 'BSc in IT at MUBAS',
          institution: 'Malawi University of Business and Applied Sciences (MUBAS)',
          description: 'Focusing on software engineering, database management, and system analysis.',
        },
        {
          period: '2021 - 2023',
          title: 'Advanced Diploma in ICT',
          institution: 'Local College of Tech',
          description: 'Completed comprehensive courses in networking and basic programming principles.',
        },
      ],
    },
    portfolio: {
      title: 'Portfolio',
      categoryDesign: 'Design',
      categorySoftware: 'Software',
      projects: [
        { title: 'Elegant E-commerce UI', category: 'Design', image: 'https://placehold.co/800x600/1A1A1A/FAF7F2?text=E-commerce+Design' },
        { title: 'Real-time Chat App', category: 'Software', image: 'https://placehold.co/800x600/0A1A2F/FAF7F2?text=Chat+App+Software' },
        { title: 'Branding Kit for Startup', category: 'Design', image: 'https://placehold.co/800x600/0D9488/FAF7F2?text=Startup+Branding' },
        { title: 'API Integration Tool', category: 'Software', image: 'https://placehold.co/800x600/F59E0B/1A1A1A?text=API+Project' },
      ],
    },
    contact: {
      title: 'Contact',
      formTitle: 'Get in Touch',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      sendMessage: 'Send Message',
      successMessage: 'Message Sent Successfully!',
      callToAction: "Let's build something exceptional together. I'm open for collaboration.",
    },
    footer: {
      copyright: '© 2024 Gadjet Designs. All rights reserved.',
      designer: 'Handcrafted by Gadjet',
    },
  },
  ny: {
    navbar: ['Pakhomo', 'Zokhudza Ine', 'Ntchito Zanga', 'Lumikizanani'],
    hero: {
      greeting: "Moni, Ndine Gadjet.",
      title: 'Wophunzira wa IT ndi Wopanga Zithunzi',
      viewPortfolio: 'Onani Ntchito',
      contactMe: 'Lumikizanani Nane',
      description: "Kugwirizanitsa luntha la ukadaulo ndi kamangidwe katsopano kopanga ma digito apamwamba kwambiri.",
    },
    about: {
      title: 'Zokhudza Ine',
      biographyTitle: 'Mbiri Yaifupi',
      bioText: "Ndine wophunzira wamphamvu yemwe akuchita BSc mu Information Technology ku MUBAS, ndikuyamba mu Januware. Ndimagwirizanitsa maziko anga a maphunziro ndi chikondi cha kamangidwe kokongola, ndikukonda kupanga ma-interface a ogwiritsa ntchito ndi mawebusaiti omwe ali okongola komanso ogwira ntchito.",
      skillsTitle: 'Maluso Anga',
      skills: ['Kupanga kwa UI/UX', 'Kupanga Mawebusaiti', 'Kupanga Zithunzi', 'Zida ndi Zomangira'],
      educationTitle: 'Maphunziro Anga',
      education: [
        {
          period: 'Jan 2024 - Lero',
          title: 'BSc mu IT ku MUBAS',
          institution: 'Malawi University of Business and Applied Sciences (MUBAS)',
          description: 'Kuyang’ana kwambiri pa ukadaulo wa mapulogalamu, kasamalidwe ka database, ndi kusanthula kwa ma system.',
        },
        {
          period: '2021 - 2023',
          title: 'Dipuloma Yapamwamba mu ICT',
          institution: 'Sukulu Ya Technology',
          description: 'Ndamaliza maphunziro athunthu pa networking ndi mfundo zoyambira za programming.',
        },
      ],
    },
    portfolio: {
      title: 'Ntchito Zanga',
      categoryDesign: 'Kupanga Zithunzi',
      categorySoftware: 'Mapulogalamu',
      projects: [
        { title: 'Elegant E-commerce UI', category: 'Design', image: 'https://placehold.co/800x600/1A1A1A/FAF7F2?text=E-commerce+Design' },
        { title: 'Real-time Chat App', category: 'Software', image: 'https://placehold.co/800x600/0A1A2F/FAF7F2?text=Chat+App+Software' },
        { title: 'Branding Kit for Startup', category: 'Design', image: 'https://placehold.co/800x600/0D9488/FAF7F2?text=Startup+Branding' },
        { title: 'API Integration Tool', category: 'Software', image: 'https://placehold.co/800x600/F59E0B/1A1A1A?text=API+Project' },
      ],
    },
    contact: {
      title: 'Lumikizanani',
      formTitle: 'Tiyankhulane',
      name: 'Dzina',
      email: 'Imelo',
      message: 'Uthenga',
      sendMessage: 'Tumiza Uthenga',
      successMessage: 'Uthenga Watumizidwa Bwino!',
      callToAction: "Tiyeni tipange china chake chapadera. Ndine wokonzeka kugwira ntchito pamodzi.",
    },
    footer: {
      copyright: '© 2024 Gadjet Designs. Ufulu wonse ndi wawo.',
      designer: 'Wopangidwa ndi Gadjet',
    },
  },
};

// --- 3. FRAMER MOTION VARIANTS ---
const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0.0, 0.2, 1], // Custom cubic-bezier for a smooth, high-end feel
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemReveal = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const containerView = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

// --- 4. MAIN COMPONENT ---
function PortfolioPage() {
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'
  const [lang, setLang] = useState('en'); // 'en' or 'ny'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const t = useMemo(() => translations[lang], [lang]);

  // Set initial theme based on system preference (optional)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  // Apply theme class and base colors to the root element
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const toggleLang = useCallback(() => {
    setLang(prevLang => (prevLang === 'en' ? 'ny' : 'en'));
  }, []);

  const navItems = t.navbar.map(item => ({
    label: item,
    id: item.toLowerCase().replace(/ /g, ''), // "Home" -> "home"
  }));

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset by navbar height (approx 60px)
      const offset = 60;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false); // Close menu after click
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send data to a backend here.
    // For the single-file example, we just simulate success.
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      e.target.reset(); // Clear form
    }, 3000);
  };

  // Dynamic style for the main wrapper (Fix for transparent overlay)
  const dynamicWrapperStyle = {
    backgroundColor: theme === 'light' ? COLORS.cream : COLORS.navy,
    color: theme === 'light' ? COLORS.charcoal : COLORS.cream,
  };

  const tealColor = theme === 'light' ? COLORS.teal : 'white'; // Teal text in light mode, White text in dark mode for contrast
  const goldColor = COLORS.gold;

  // --- Utility Components ---

  const AccentDivider = () => (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className={`h-[1px] opacity-30 my-6 transform origin-left`}
      style={{ backgroundColor: theme === 'light' ? COLORS.teal : COLORS.gold }}
    />
  );

  const SectionTitle = ({ children, id }) => (
    <motion.h2
      id={id}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
      className={`text-4xl sm:text-5xl font-extrabold mb-12 border-l-4 pl-4 inline-block`}
      style={{ fontFamily: 'serif', borderColor: theme === 'light' ? COLORS.teal : COLORS.gold }}
    >
      {children}
    </motion.h2>
  );

  const AnimatedSection = ({ children, id, className = '' }) => {
    const sectionBgStyle = id === 'about' || id === 'contact'
      ? { backgroundColor: theme === 'light' ? COLORS.cream : COLORS.charcoal }
      : { backgroundColor: theme === 'light' ? COLORS.cream : COLORS.navy };

    return (
      <motion.section
        id={id}
        className={`py-20 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto ${className}`}
        style={sectionBgStyle}
      >
        {children}
      </motion.section>
    );
  };

  // --- 5. NAVBAR ---
  const Navbar = () => (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 shadow-xl backdrop-blur-md transition-colors duration-500`}
      style={{
        backgroundColor: theme === 'light' ? `${COLORS.cream}e6` : `${COLORS.navy}e6`, // Semi-transparent based on theme
        borderBottom: `1px solid ${COLORS.teal}30`,
        color: theme === 'light' ? COLORS.charcoal : COLORS.cream,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <div
          className={`text-2xl font-bold cursor-pointer transition duration-300 tracking-wider`}
          onClick={() => handleScroll('home')}
          style={{ color: theme === 'light' ? COLORS.teal : COLORS.gold }}
        >
          Gadjet Designs
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map(({ label, id }) => (
            <motion.a
              key={id}
              href={`#${id}`}
              onClick={(e) => { e.preventDefault(); handleScroll(id); }}
              className={`text-sm font-medium transition-colors duration-200 uppercase tracking-wide
                          hover:text-opacity-80`}
              style={{ color: theme === 'light' ? COLORS.charcoal : COLORS.cream }} // Base color set by wrapper
              whileHover={{ y: -2, color: theme === 'light' ? COLORS.teal : COLORS.gold }}
            >
              {label}
            </motion.a>
          ))}
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-2" />
          {/* Language Toggle */}
          <motion.button
            onClick={toggleLang}
            className={`p-2 rounded-full transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center`}
            aria-label="Toggle language"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Globe size={18} />
            <span className="text-xs ml-1 font-semibold">{lang.toUpperCase()}</span>
          </motion.button>
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700`}
            aria-label="Toggle theme"
            whileHover={{ rotate: 15, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} style={{ color: COLORS.gold }} />}
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleLang} aria-label="Toggle language">
            <Globe size={20} />
            <span className="text-xs ml-1 font-semibold">{lang.toUpperCase()}</span>
          </button>
          <button onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} style={{ color: COLORS.gold }} />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content (Slide Down) */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`md:hidden flex flex-col p-4 space-y-2 border-t border-gray-200 dark:border-gray-800`}
          style={{ backgroundColor: theme === 'light' ? COLORS.cream : COLORS.navy }}
        >
          {navItems.map(({ label, id }) => (
            <motion.a
              key={id}
              href={`#${id}`}
              onClick={(e) => { e.preventDefault(); handleScroll(id); }}
              className={`block py-2 px-3 text-lg font-medium transition-colors duration-200 rounded-md`}
              style={{ color: theme === 'light' ? COLORS.charcoal : COLORS.cream }}
              whileHover={{ color: theme === 'light' ? COLORS.teal : COLORS.gold }}
              variants={itemReveal}
            >
              {label}
            </motion.a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );

  // --- 6. SECTIONS ---

  // 6.1 Home Section
  const HomeSection = () => (
    <AnimatedSection id="home" className="min-h-[90vh] flex items-center">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="order-2 md:order-1">
          <motion.p
            variants={heroVariants}
            className={`text-xl font-medium mb-2`}
            style={{ color: theme === 'light' ? COLORS.teal : COLORS.gold }}
          >
            {t.hero.greeting}
          </motion.p>
          <motion.h1 variants={heroVariants} className="text-6xl sm:text-7xl font-extrabold leading-tight mb-4">
            I craft digital <span className={`dark:text-white`} style={{ color: COLORS.teal }}>experiences</span>.
          </motion.h1>
          <motion.p variants={heroVariants} className="text-2xl font-light mb-6">
            {t.hero.title}
          </motion.p>
          <motion.p variants={heroVariants} className="text-base max-w-lg mb-8 opacity-80">
            {t.hero.description}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={staggerContainer} className="flex space-x-4">
            <motion.button
              variants={itemReveal}
              onClick={() => handleScroll('portfolio')}
              className={`px-6 py-3 text-sm font-semibold rounded-lg shadow-lg uppercase tracking-wider
                          text-white transition-all duration-300`}
              style={{ backgroundColor: COLORS.teal }}
              whileHover={{ scale: 1.05, boxShadow: `0 4px 15px -3px ${COLORS.teal}80` }}
              whileTap={{ scale: 0.98 }}
            >
              {t.hero.viewPortfolio}
            </motion.button>
            <motion.button
              variants={itemReveal}
              onClick={() => handleScroll('contact')}
              className={`px-6 py-3 text-sm font-semibold rounded-lg shadow-lg uppercase tracking-wider border-2
                          hover:text-[${COLORS.charcoal}] transition-all duration-300`}
              style={{
                borderColor: COLORS.gold,
                color: COLORS.gold,
              }}
              whileHover={{ scale: 1.05, backgroundColor: COLORS.gold, boxShadow: `0 4px 15px -3px ${COLORS.gold}80` }}
              whileTap={{ scale: 0.98 }}
            >
              {t.hero.contactMe}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          className="order-1 md:order-2 flex justify-center p-8"
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div
            className={`w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-2xl transition duration-500
                           border-8`}
            style={{ borderColor: theme === 'light' ? COLORS.teal : COLORS.gold }}
          >
            {/* Using a high-quality placeholder image that suggests a profile picture */}
            <img
              src="https://placehold.co/800x800/1A1A1A/FAF7F2?text=GD"
              alt="Gadjet Designs Profile"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/800x800/1A1A1A/FAF7F2?text=GD';
              }}
            />
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );

  // 6.2 About Section
  const AboutSection = () => (
    <AnimatedSection id="about">
      <SectionTitle id="about">{t.about.title}</SectionTitle>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Biography & Skills */}
        <div className="space-y-12">
          {/* Biography */}
          <motion.div variants={containerView} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h3
              className={`text-3xl font-bold mb-4 border-b pb-2`}
              style={{ borderColor: theme === 'light' ? `${COLORS.teal}33` : `${COLORS.gold}33` }}
            >
              {t.about.biographyTitle}
            </h3>
            <p className="text-lg leading-relaxed opacity-90">{t.about.bioText}</p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div variants={containerView} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h3
              className={`text-3xl font-bold mb-6 border-b pb-2`}
              style={{ borderColor: theme === 'light' ? `${COLORS.teal}33` : `${COLORS.gold}33` }}
            >
              {t.about.skillsTitle}
            </h3>
            <motion.div variants={staggerContainer} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {t.about.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={itemReveal}
                  className={`p-4 rounded-lg text-center text-sm font-semibold transition-all duration-300
                              bg-gray-100 dark:bg-gray-800 shadow-md border-b-4`}
                  style={{ borderColor: theme === 'light' ? COLORS.teal : COLORS.gold }}
                  whileHover={{ y: -5, boxShadow: '0 8px 15px -5px rgba(0,0,0,0.1)' }}
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Vertical Timeline (Education) */}
        <motion.div
          variants={containerView} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="lg:mt-0 mt-12"
        >
          <h3
            className={`text-3xl font-bold mb-6 border-b pb-2`}
            style={{ borderColor: theme === 'light' ? `${COLORS.teal}33` : `${COLORS.gold}33` }}
          >
            {t.about.educationTitle}
          </h3>
          <div className="relative pt-10">
            {/* Timeline Line */}
            <div
              className={`absolute top-0 left-0 h-full w-0.5`}
              style={{ backgroundColor: theme === 'light' ? COLORS.teal : COLORS.gold }}
            />

            {t.about.education.map((item, index) => (
              <motion.div
                key={index}
                className="mb-8 pl-8 relative"
                variants={itemReveal}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute left-0 w-4 h-4 rounded-full -ml-[7px] mt-1
                                 border-2 shadow-md`}
                  style={{
                    backgroundColor: theme === 'light' ? COLORS.cream : COLORS.navy,
                    borderColor: theme === 'light' ? COLORS.teal : COLORS.gold,
                  }}
                />

                <p className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400">{item.period}</p>
                <h4
                  className={`text-xl font-bold mt-1 dark:text-white`}
                  style={{ color: tealColor }}
                >
                  {item.title}
                </h4>
                <p className="text-base font-medium opacity-90">{item.institution}</p>
                <p className="text-sm mt-1 opacity-70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );

  // 6.3 Portfolio Section
  const PortfolioSection = () => {
    // Helper function to resolve category labels
    const getCategoryLabel = (category) => {
      if (category === 'Design') return lang === 'en' ? 'Design' : t.portfolio.categoryDesign;
      if (category === 'Software') return lang === 'en' ? 'Software' : t.portfolio.categorySoftware;
      return category;
    };

    // Helper to get category style
    const getCategoryStyle = (category) => {
      const isDesign = category === 'Design';
      const color = isDesign ? COLORS.teal : COLORS.gold;
      return {
        color: color,
        backgroundColor: `${color}20`, // Hex color + 20% alpha
      };
    };

    return (
      <AnimatedSection id="portfolio" className={`bg-gray-50 dark:bg-[${COLORS.navy}]`}>
        <SectionTitle id="portfolio">{t.portfolio.title}</SectionTitle>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {t.portfolio.projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemReveal}
              className={`rounded-xl shadow-xl overflow-hidden cursor-pointer transition-all duration-300
                          bg-white dark:bg-[${COLORS.charcoal}]`}
              whileHover={{
                y: -10,
                boxShadow: `0 15px 30px -10px ${COLORS.teal}40`,
                scale: 1.03
              }}
            >
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/800x600/${COLORS.teal.substring(1)}/FAF7F2?text=GD+Project`;
                  }}
                />
              </div>
              <div className="p-6">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider
                              dark:opacity-80`}
                  style={getCategoryStyle(project.category)}
                >
                  {getCategoryLabel(project.category)}
                </span>
                <h3 className="text-xl font-bold mt-3 mb-1">{project.title}</h3>
                <p className="text-sm opacity-70">A brief description of the project and its impact.</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatedSection>
    );
  };

  // 6.4 Contact Section
  const ContactSection = () => (
    <AnimatedSection id="contact">
      <SectionTitle id="contact">{t.contact.title}</SectionTitle>

      <motion.div
        variants={containerView}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-3xl mx-auto p-8 rounded-xl shadow-2xl transition-all duration-500
                    bg-white dark:bg-[${COLORS.navy}] border-t-4"
        style={{
          backgroundColor: theme === 'light' ? 'white' : COLORS.navy,
          borderColor: theme === 'light' ? COLORS.teal : COLORS.gold
        }}
      >
        <h3
          className={`text-3xl font-bold mb-6 text-center`}
          style={{ color: theme === 'light' ? COLORS.teal : COLORS.gold }}
        >
          {t.contact.formTitle}
        </h3>
        <p className="text-center mb-8 opacity-80">{t.contact.callToAction}</p>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Name */}
          <motion.div variants={itemReveal}>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              {t.contact.name}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder={t.contact.name}
              className={`w-full p-3 rounded-lg border focus:ring-2 focus:border-opacity-70
                          bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 transition duration-300`}
              style={{
                borderColor: theme === 'light' ? COLORS.teal : COLORS.gold,
                '--tw-ring-color': theme === 'light' ? COLORS.teal : COLORS.gold
              }}
            />
          </motion.div>

          {/* Email */}
          <motion.div variants={itemReveal}>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              {t.contact.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder={t.contact.email}
              className={`w-full p-3 rounded-lg border focus:ring-2 focus:border-opacity-70
                          bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 transition duration-300`}
              style={{
                borderColor: theme === 'light' ? COLORS.teal : COLORS.gold,
                '--tw-ring-color': theme === 'light' ? COLORS.teal : COLORS.gold
              }}
            />
          </motion.div>

          {/* Message */}
          <motion.div variants={itemReveal}>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              {t.contact.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              placeholder={t.contact.message}
              className={`w-full p-3 rounded-lg border focus:ring-2 focus:border-opacity-70
                          bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 transition duration-300`}
              style={{
                borderColor: theme === 'light' ? COLORS.teal : COLORS.gold,
                '--tw-ring-color': theme === 'light' ? COLORS.teal : COLORS.gold
              }}
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className={`w-full px-6 py-3 text-lg font-bold rounded-lg uppercase tracking-wider
                         transition-all duration-300 shadow-xl`}
            style={{ backgroundColor: COLORS.gold, color: COLORS.charcoal }}
            whileHover={{ scale: 1.05, boxShadow: `0 8px 20px -5px ${COLORS.gold}80` }}
            whileTap={{ scale: 0.98 }}
            disabled={formSubmitted}
          >
            {formSubmitted ? (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="flex justify-center items-center">
                <CheckCircle className="mr-2" size={20} />
                {t.contact.successMessage}
              </motion.span>
            ) : (
              t.contact.sendMessage
            )}
          </motion.button>
        </form>
      </motion.div>
    </AnimatedSection>
  );

  // 6.5 Footer
  const Footer = () => (
    <footer className={`py-10 border-t border-gray-200 dark:border-gray-800`} style={{ backgroundColor: theme === 'light' ? '#f9fafb' : COLORS.charcoal }}>
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className={`text-2xl font-bold mb-4`}
          style={{ color: theme === 'light' ? COLORS.teal : COLORS.gold }}
          whileHover={{ scale: 1.05 }}
        >
          Gadjet Designs
        </motion.div>
        <p className="text-sm opacity-70 mb-2">{t.footer.copyright}</p>
        <p className="text-xs italic opacity-50">{t.footer.designer}</p>
      </motion.div>
    </footer>
  );


  // --- 7. RENDER ---
  return (
    // Applied dynamic styles to the wrapper to handle the theme switch and background.
    <div className="min-h-screen font-inter transition-colors duration-500 relative" style={dynamicWrapperStyle}>
      <Navbar />
      {/* Ensure main content starts below the fixed navbar */}
      <main className="pt-[60px] relative z-[1]">
        <HomeSection />
        <AccentDivider />
        <AboutSection />
        <AccentDivider />
        <PortfolioSection />
        <AccentDivider />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default PortfolioPage;