"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// SCHOOL COLORS
const COLORS = {
  navy: "#0A1931",
  gold: "#D4AF37",
  goldHover: "#b9962f",
  cream: "#FFFDD0",
  lightNavy: "#142744",
};

const navLinks = [
  { name: "Home", href: "/" },

  {
    name: "Admissions",
    dropdown: [
      { name: "Admissions", href: "/admission" },
      { name: "Scholarships & Aid", href: "/alumni" },
      { name: "School Tours", href: "#" },
    ],
  },

  {
    name: "Curriculum",
    dropdown: [
      { name: "Subjects Offered", href: "#" },
      { name: "Exam Schedules", href: "#" },
      { name: "E-Learning Portal", href: "/e-learning" },
    ],
  },

  {
    name: "Activities",
    dropdown: [
      { name: "Sports Teams", href: "#" },
      { name: "Clubs & Societies", href: "#" },
      { name: "Community Outreach", href: "#" },
    ],
  },

  { name: "Staff Directory", href: "/staff" },
  { name: "Contact Us", href: "/contact-us" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (i) => {
    setActiveDropdown(activeDropdown === i ? null : i);
  };

  return (
    <nav
      className="sticky top-0 w-full z-50 shadow-xl"
      style={{ backgroundColor: COLORS.navy }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* LEFT SECTION — LOGO + SCHOOL NAME */}
          <div className="flex items-center space-x-3">
            <Image
              src="/assets/images/logo.jpg"
              width={42}
              height={42}
              alt="School Logo"
              className="rounded-full"
            />

            <span className="text-lg md:text-2xl font-bold text-white tracking-wide">
              Nkhotakota College Secondary School
            </span>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>

          {/* NAV LINKS */}
          <div className={`hidden md:flex items-center space-x-8`}>
            {navLinks.map((link, i) =>
              link.dropdown ? (
                <div
                  key={i}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(i)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="text-white hover:text-[#FFFDD0] flex items-center transition">
                    {link.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === i && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 mt-2 w-48 rounded-md shadow-lg"
                        style={{ backgroundColor: COLORS.lightNavy }}
                      >
                        {link.dropdown.map((item, j) => (
                          <Link
                            key={j}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-[#FFFDD0] hover:bg-[#1c3558] transition"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={i}
                  href={link.href}
                  className="relative text-white hover:text-[#FFFDD0] transition group"
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#FFFDD0] group-hover:w-full transition-all"></span>
                </Link>
              )
            )}

            {/* RESULTS PORTAL BUTTON */}
            <Link
              href="/results-portal"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-[#0A1931]"
              style={{
                backgroundColor: COLORS.cream,
              }}
            >
              Results Portal
            </Link>

            {/* LOGIN BUTTON */}
            <Link
              href="/login"
              className="px-5 py-2 rounded-lg font-semibold text-[#0A1931] transition"
              style={{ backgroundColor: COLORS.gold }}
            >
              Login
            </Link>
          </div>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 space-y-4"
          >
            {navLinks.map((link, i) =>
              link.dropdown ? (
                <div key={i}>
                  <button
                    className="flex justify-between w-full text-white"
                    onClick={() => toggleDropdown(i)}
                  >
                    {link.name}
                    {activeDropdown === i ? <ChevronUp /> : <ChevronDown />}
                  </button>

                  {activeDropdown === i && (
                    <div className="pl-4 mt-2 space-y-2">
                      {link.dropdown.map((item, j) => (
                        <Link
                          key={j}
                          href={item.href}
                          className="block text-[#FFFDD0] hover:text-white"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={i}
                  href={link.href}
                  className="block text-white hover:text-[#FFFDD0]"
                >
                  {link.name}
                </Link>
              )
            )}

            {/* MOBILE RESULTS PORTAL */}
            <Link
              href="/results-portal"
              className="block w-full text-center py-2 rounded-lg font-semibold mt-4"
              style={{ backgroundColor: COLORS.cream, color: COLORS.navy }}
            >
              Results Portal
            </Link>

            {/* MOBILE LOGIN BUTTON */}
            <Link
              href="/login"
              className="block w-full text-center py-2 rounded-lg font-semibold"
              style={{ backgroundColor: COLORS.gold, color: COLORS.navy }}
            >
              Login
            </Link>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
