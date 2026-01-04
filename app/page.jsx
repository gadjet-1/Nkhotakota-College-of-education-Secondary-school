"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  ArrowRight, BookOpen, Users, GraduationCap, Trophy, Globe,
  CheckCircle, Shield, TrendingUp, Cpu, Speaker, Briefcase,
  Mail, Phone
} from "lucide-react";
import Navbar from "../components/header.jsx";
import Footer from "../components/footer.jsx";

const COLORS = {
  NAVY: "#45000C",
  ACCENT: "#c07f3f",
  DARK_TEXT: "#45000C",
  HERO_OVERLAY: "rgba(0,0,0,0)",
  BG: "#ffffff",
};

// Intersection Observer Hook
const useInView = (threshold = 0) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  const checkInView = useCallback(() => {
    if (!ref.current || inView) return;
    const rect = ref.current.getBoundingClientRect();
    const isVisible =
      rect.top <= window.innerHeight - threshold && rect.bottom >= threshold;

    if (isVisible) setInView(true);
  }, [inView, threshold]);

  useEffect(() => {
    checkInView();
    window.addEventListener("scroll", checkInView, { passive: true });
    window.addEventListener("resize", checkInView);

    return () => {
      window.removeEventListener("scroll", checkInView);
      window.removeEventListener("resize", checkInView);
    };
  }, [checkInView]);

  return [ref, inView];
};

// Counter Animation Hook
const useCounter = (end, duration = 2000, shouldAnimate = false) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!shouldAnimate || hasAnimated.current) {
      setCount(0);
      return;
    }
    hasAnimated.current = true;

    let start = 0;
    const increment = end / (duration / 10);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 10);

    return () => clearInterval(timer);
  }, [end, duration, shouldAnimate]);

  return count;
};

// Animated Wrapper Component
const AnimatedSection = ({
  children,
  className = "",
  animation = "fade-in",
  staggerDelay = 0,
}) => {
  const [ref, inView] = useInView(100);
  let animationClass = "";

  switch (animation) {
    case "slide-up":
      animationClass = `transition-all duration-1000 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`;
      break;
    case "slide-left":
      animationClass = `transition-all duration-1000 ease-out ${
        inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
      }`;
      break;
    case "slide-right":
      animationClass = `transition-all duration-1000 ease-out ${
        inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
      }`;
      break;
    case "zoom-in":
      animationClass = `transition-all duration-900 ease-out ${
        inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`;
      break;
    default:
      animationClass = `transition-opacity duration-900 ease-out ${
        inView ? "opacity-100" : "opacity-0"
      }`;
  }

  const style =
    inView && staggerDelay > 0 ? { transitionDelay: `${staggerDelay}ms` } : {};

  return (
    <div ref={ref} className={`${className} ${animationClass}`} style={style}>
      {children}
    </div>
  );
};

const SectionTitle = ({ children, className = "" }) => (
  <h2
    className={`text-3xl md:text-4xl lg:text-5xl font-serif font-extrabold text-[#45000C] mb-4 text-center ${className}`}
  >
    {children} 
  </h2>
); 

const StatCounter = ({ end, label, prefix = "", suffix = "" }) => {
  const [ref, inView] = useInView(50);
  const count = useCounter(end, 2000, inView);

  return (
    <div ref={ref} className="text-center p-4">
      <div className="text-4xl md:text-5xl font-serif font-bold text-[#c07f3f] leading-none">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="text-lg text-[#6A0F1A] font-semibold mt-2 font-sans">
        {label}
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [heroIndex, setHeroIndex] = useState(0);

  const heroSlides = [
    {
      text: "NKHOTAKOTA COLLEGE OF EDUCATION SEC SCHOOL",
      image: "/assets/images/hero1.jpg",
    },
    {
      text: "Where academic rigour meets innovation.",
      image: "/assets/images/hero2.jpg",
    },
    {
      text: "The disciplined path to MSCE excellence.",
      image: "/assets/images/scout.jpg",
    },
  ];

  // 4-second slide interval
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col bg-white text-[#111827]"
      style={{ overflowX: "hidden" }}
    >
      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative h-[78vh] md:h-[72vh] w-full overflow-hidden">
          {heroSlides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                idx === heroIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              style={{
                backgroundImage: `url('${slide.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundColor: "#000",
              }}
            >
              <div
                className="absolute inset-0"
                style={{ background: COLORS.HERO_OVERLAY }}
              />
            </div>
          ))}

          <div className="relative z-20 h-full flex items-center justify-center text-center px-6">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection animation="zoom-in">
                <h1
                  className="font-serif font-extrabold text-[#c07f3f]"
                  style={{
                    fontSize: "clamp(28px, 4.5vw, 64px)",
                    lineHeight: 1.02,
                  }}
                >
                  NKHOTAKOTA COLLEGE OF EDUCATION SECONDARY SCHOOL
                </h1>
              </AnimatedSection>

              <AnimatedSection animation="fade-in" staggerDelay={120}>
                <p className="mt-5 text-white text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
                  Empowering tomorrow’s leaders through discipline, innovation,
                  and academic excellence in Nkhotakota.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in" staggerDelay={220}>
                <div className="mt-8 flex justify-center">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-[#c07f3f] text-[#45000C] font-semibold rounded-full shadow-lg hover:scale-105 transition"
                  >
                    Enroll Now <ArrowRight />
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>


       {/* ABOUT */}
<section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F7E8]">
  <div className="max-w-6xl mx-auto">
    <AnimatedSection animation="fade-in">
      <SectionTitle>Welcome to Nkhotakota College of Education Secondary School</SectionTitle>

      {/* Main About Text */}
      <p className="text-lg text-[#758695] mb-12 text-center max-w-3xl mx-auto font-sans leading-relaxed">
        Nkhotakota College of Education Secondary School is committed to shaping future leaders 
        through quality education, discipline, and character development. We provide a 
        learner-centered environment that nurtures creativity, responsibility, and academic 
        excellence right in the heart of Nkhotakota.
      </p>

      {/* Motto, Mission, Vision */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        
        {/* Motto */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-bold text-[#45000C] mb-4 text-center">Our Motto</h3>
          <p className="text-[#758695] text-center">
            “Learning Today, Leading Tomorrow.”
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-bold text-[#45000C] mb-4 text-center">Our Mission</h3>
          <p className="text-[#758695] text-center">
            To deliver inclusive, high-quality education that empowers students with knowledge, 
            critical thinking skills, and strong moral values for a better future.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-bold text-[#45000C] mb-4 text-center">Our Vision</h3>
          <p className="text-[#758695] text-center">
            To become a leading center of academic excellence that inspires innovation, integrity, 
            and lifelong learning.
          </p>
        </div>
      </div>

      {/* Discover More Button */}
      <div className="text-center mt-12">
        <a
          href="#"
          className="inline-block px-8 py-3 text-[#45000C] border-2 border-[#45000C] font-semibold rounded-full transition duration-300 hover:bg-[#45000C] hover:text-white"
        >
          Discover More About Us
        </a>
      </div>
    </AnimatedSection>
  </div>
</section>


        {/* CURRICULUM & STATS */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="zoom-in">
              <SectionTitle>Our Curriculum & Success</SectionTitle>
              <p className="text-lg text-[#758695] mb-8 text-center max-w-3xl mx-auto font-sans">
                Comprehensive preparation for JCE and MSCE, combining theory and practical learning for exam readiness and long-term success.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <StatCounter end={98} suffix="%" label="JCE Pass Rate" />
              <StatCounter end={95} suffix="%" label="MSCE Pass Rate" />
              <StatCounter end={1200} label="Students Enrolled" />
            </div>

            <AnimatedSection animation="slide-up" staggerDelay={200}>
              <div className="text-center mt-12">
                <a
                  href="#"
                  className="inline-block px-6 py-2 bg-[#c07f3f] text-white font-semibold rounded-full shadow-lg transition duration-300 hover:bg-[#A36934]"
                >
                  View Curriculum Details
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* SUBJECTS */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F7E8]">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="slide-left">
              <SectionTitle>Core Subjects Offered</SectionTitle>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {[
                { title: "Sciences & Math", icon: Cpu, subjects: ["Biology", "Chemistry", "Physics", "Mathematics", "Computer Studies"], color: "bg-[#134b42]" },
                { title: "Humanities", icon: Globe, subjects: ["Geography", "History", "Social Studies", "Bible knowledge"], color: "bg-[#45000C]" },
                { title: "Languages & Arts", icon: Speaker, subjects: ["English", "Chichewa", "French (Optional)", "Literature"], color: "bg-[#575757]" },
              ].map((item, i) => (
                <AnimatedSection key={i} animation={i % 2 === 0 ? "slide-left" : "slide-right"} staggerDelay={i * 120}>
                  <div className={`p-6 rounded-xl text-white transform transition-all duration-400 hover:scale-[1.02] ${item.color}`}>
                    <item.icon className="w-8 h-8 mb-3 text-[#c07f3f]" />
                    <h3 className="text-2xl font-serif font-bold mb-3">{item.title}</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-100">
                      {item.subjects.map((s, si) => <li key={si}>{s}</li>)}
                    </ul>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
 {/* LEADERSHIP SECTION */}
 <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="slide-up">
              <SectionTitle>Meet Our Leadership</SectionTitle>
            </AnimatedSection>

            {/* HEAD TEACHER CARD */}
            <div className="flex flex-col md:flex-row items-center bg-[#F7F7E8] p-6 rounded-xl shadow">
              <div className="w-full md:w-1/4 text-center">
                <Image
                  src="/assets/images/head.jpg"
                  width={220}
                  height={220}
                  alt="Head Teacher"
                  className="rounded-full object-cover border-4 border-[#c07f3f]"
                />
              </div>

              <div className="md:pl-10 mt-6 md:mt-0 text-center md:text-left">
                <p className="italic text-[#575757] mb-3">
                  “At NCOE, we instill discipline, knowledge, and character.”
                </p>
                <h3 className="text-2xl font-bold text-[#45000C]">
                  Mr. Chiwawula Ambali
                </h3>
                <p className="text-[#c07f3f] font-semibold">Head Teacher</p>
              </div>
            </div>

            {/* LEADERSHIP TEAM — FIXED (explicit image paths) */}
            <h3 className="text-2xl md:text-3xl text-[#45000C] text-center mt-10 mb-6">
              Leadership Team
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Mrs. Kamtunda",
                  title: "Deputy Head",
                  image: "/assets/images/kamtunda.jpg",
                },
                {
                  name: "Dr. Henry Mark",
                  title: "Academics Director",
                  image: "/assets/images/henry.jpg",
                },
                {
                  name: "Mr. Phiri",
                  title: "Finance Administrator",
                  image: "/assets/images/phiri.jpg",
                },
                {
                  name: "Ms. Kingstone",
                  title: "Boarding Master",
                  image: "/assets/images/kingstone.jpg",
                },
              ].map((m, i) => (
                <AnimatedSection key={i} animation="zoom-in" staggerDelay={i * 100}>
                  <div className="p-4 bg-white border rounded-lg text-center shadow hover:shadow-xl transition">
                    <Image
                      src={m.image}
                      width={128}
                      height={128}
                      alt={m.name}
                      className="rounded-full object-cover mx-auto mb-3"
                    />
                    <p className="font-bold text-[#45000C]">{m.name}</p>
                    <p className="text-[#758695]">{m.title}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <div className="text-center mt-10">
              <a
                href="/staff"
                className="inline-block px-6 py-2 border-2 border-[#c07f3f] text-[#c07f3f] rounded-full hover:bg-[#c07f3f] hover:text-white transition"
              >
                Meet Full Staff
              </a>
            </div>
          </div>
        </section>
        {/* WHY CHOOSE */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="slide-up">
              <SectionTitle>Excellence in Every Pillar</SectionTitle>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {[
                { title: "Strong exam performance", icon: TrendingUp },
                { title: "Highly qualified staff", icon: Users },
                { title: "ICT integration", icon: Cpu },
                { title: "Safe and disciplined environment", icon: Shield },
                { title: "Excellent Boarding Facilities", icon: Briefcase },
                { title: "Culture of respect, integrity, ambition", icon: CheckCircle },
              ].map((it, idx) => (
                <AnimatedSection key={idx} animation="slide-up" staggerDelay={idx * 80}>
                  <div className="flex items-start space-x-4 p-4 bg-[#F7F7E8] rounded-lg shadow-md hover:shadow-xl transition">
                    <it.icon className="w-8 h-8 text-[#6A0F1A] flex-shrink-0 mt-1" />
                    <p className="text-lg font-semibold text-[#45000C]">{it.title}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#45000C] text-white">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-in">
              <SectionTitle className="text-[#c07f3f]">Our Achievements</SectionTitle>
              <p className="text-lg text-gray-200 mb-8 text-center max-w-3xl mx-auto">
                Measurable success and dedication to community upliftment define our school's legacy.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
              <StatCounter end={500} prefix="+" label="Alumni at Top Universities" />
              <StatCounter end={18} label="National Awards & Recognitions" />
              <StatCounter end={120} prefix="+" label="Community Service Hours" />
              <StatCounter end={9} prefix="Best of " label="JCE/MSCE Top Ten Finishes" />
            </div>
          </div>
        </section>


        {/* NEWS & EVENTS, ACTIVITIES, GALLERY, TESTIMONIALS, CTA */}
        {/* For brevity keeping the previously structured sections intact but using same Responsive patterns and AnimatedSection */}
        {/* -- News & Events -- */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F7E8]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <AnimatedSection animation="slide-left">
                <SectionTitle className="text-left">Latest News</SectionTitle>
              </AnimatedSection>

              <div className="space-y-6 mt-6">
                {[
                  { title: "Term 1 closing Dates for 2025/2026 Announced", date: "Dec 20, 2026" },
                  { title: "MSCE Prep Classes Commencing Soon", date: "Dec 15, 2025" },
                  { title: "PTA Meeting Scheduled for December", date: "Dec 01, 2025" },
                ].map((item, idx) => (
                  <AnimatedSection key={idx} animation="slide-left" staggerDelay={idx * 80}>
                    <div className="p-4 bg-white rounded-lg shadow border-l-4 border-[#c07f3f]">
                      <p className="text-sm text-[#758695]">{item.date}</p>
                      <h4 className="text-lg font-semibold text-[#45000C]">{item.title}</h4>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            <div>
              <AnimatedSection animation="slide-right">
                <SectionTitle className="text-left">Upcoming Events</SectionTitle>
              </AnimatedSection>

              <div className="space-y-6 mt-6">
                {[
                  { title: "Annual Prize-Giving Ceremony", date: "February, 2026", icon: Trophy },
                  { title: "School Open Day & Tours", date: "November 25, 2025", icon: BookOpen },
                  { title: "Inter-School Sports Competition", date: "November 10, 2024", icon: Speaker },
                ].map((it, idx) => (
                  <AnimatedSection key={idx} animation="slide-right" staggerDelay={idx * 80}>
                    <div className="flex items-center p-4 bg-white rounded-lg shadow border-r-4 border-[#6A0F1A]">
                      <it.icon className="w-6 h-6 text-[#c07f3f] mr-4" />
                      <div>
                        <h4 className="font-semibold text-[#45000C]">{it.title}</h4>
                        <p className="text-sm text-[#758695]">{it.date}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>
  {/* 10. Co-Curricular Activities (Zoom In Staggered) */}
  <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-in">
              <SectionTitle>Co-Curricular Activities</SectionTitle>
              <p className="text-xl text-[#758695] mb-12 text-center max-w-3xl mx-auto font-sans">
                Develop creativity, teamwork, and leadership outside the classroom.
              </p>
            </AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-12">
              {[
                { name: "Debate Club", icon: Speaker },
                { name: "Football and netball club", icon: Trophy },
                { name: "Fine Arts", icon: BookOpen },
                { name: "Scouts and science clubs", icon: Cpu },
                { name: "Choir and Religious clubs", icon: Speaker },
                { name: "Community Service", icon: Globe },
              ].map((activity, index) => (
                <AnimatedSection key={index} animation="zoom-in" staggerDelay={index * 100}>
                  <div className="p-4 rounded-xl border border-[#758695]/30 text-center transform transition duration-300 hover:bg-[#6A0F1A] hover:text-white hover:scale-105 group">
                    <activity.icon className="w-8 h-8 mx-auto text-[#45000C] mb-2 group-hover:text-[#c07f3f]" />
                    <p className="text-sm font-semibold text-[#45000C] group-hover:text-white font-sans">{activity.name}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* 11. Gallery Preview (Zoom In Staggered) */}
<section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#45000C] text-white">
  <div className="max-w-7xl mx-auto text-center">
    <AnimatedSection animation="fade-in">
      <SectionTitle className="text-[#c07f3f]">Our Campus & Life</SectionTitle>
    </AnimatedSection>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
      {[
        "/assets/images/hero3.jpg",
        "/assets/images/borehole.jpg",
        "/assets/images/football.jpg",
        "/assets/images/badminton.jpg"
      ].map((imgUrl, index) => (
        <AnimatedSection key={index} animation="zoom-in" staggerDelay={index * 150}>
          <div className="overflow-hidden rounded-xl shadow-xl group aspect-video">
            <img
              src={imgUrl}
              alt={`School Gallery Image ${index + 1}`}
              className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/400x300/6A0F1A/c07f3f?text=Gallery+${index + 1}`;
              }}
            />
          </div>
        </AnimatedSection>
      ))}
    </div>

    <AnimatedSection animation="slide-up" staggerDelay={500}>
      <div className="text-center mt-16">
        <a
          href="#"
          className="inline-block px-8 py-3 bg-[#c07f3f] text-[#45000C] font-semibold rounded-full shadow-lg transition duration-300 hover:bg-[#A36934] hover:text-white"
        >
          Explore Full Gallery
        </a>
      </div>
    </AnimatedSection>
  </div>
</section>

        {/* 12. Testimonials (Slide Up Staggered) */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F7E8]">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-in">
              <SectionTitle>What Parents and Students Say</SectionTitle>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                { quote: "The structured environment transformed my child's academic focus. NCOE delivers excellence!", author: "— Mrs. E. Zulu (Parent)" },
                { quote: "Greatfull am now an Engineer at AllianceOne Group company , thanks to the dedicated teachers and advanced curriculum.", author: "— L. Phiri (Alumnus 2023 cohort)" },
                { quote: "The integration of displine and Good character development among students is unmatched in Nkhotakota.", author: "— Mr. J. Banda (ommunity member)" },
              ].map((testimonial, index) => (
                <AnimatedSection key={index} animation="slide-up" staggerDelay={index * 150}>
                  <div className="p-8 bg-white rounded-xl shadow-xl border-t-4 border-[#c07f3f] h-full transition duration-300 hover:shadow-2xl">
                    <p className="text-xl font-serif italic text-[#575757] mb-4">"{testimonial.quote}"</p>
                    <p className="text-sm font-bold text-[#6A0F1A] font-sans">{testimonial.author}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

         {/* FINAL CTA */}
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#6A0F1A] text-white text-center">
    <AnimatedSection animation="zoom-in">
      <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-[#c07f3f] mb-4">
        Begin Your Journey With Us
      </h2>

      <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
        Enroll your child at Nkhotakota College Of Education Secondary School.
      </p>

      <div className="flex justify-center gap-4">
        <a href="#" className="inline-block px-8 py-3 bg-white text-[#45000C] rounded-full font-bold shadow transition hover:scale-105">
          Enroll Now
        </a>

        <a href="#" className="inline-block px-8 py-3 border-2 border-[#c07f3f] text-[#c07f3f] rounded-full transition hover:bg-[#c07f3f] hover:text-white">
          Contact Us
        </a>
      </div>
    </AnimatedSection>
  </section>
</main>

<Footer />
</div>
);
};


export default LandingPage;
