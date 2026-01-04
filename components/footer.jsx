import { useState } from 'react';
import { Mail, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const [contactStatus, setContactStatus] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');
  const currentYear = new Date().getFullYear();

  const handleFormSubmit = (e, formType) => {
    e.preventDefault();
    const setStatus = formType === 'contact' ? setContactStatus : setSubscribeStatus;
    
    setStatus(formType === 'contact' ? 'Sending message...' : 'Subscribing...');
    
    // Simulate API call delay
    setTimeout(() => {
      setStatus(formType === 'contact' ? 'Thank you! Your message has been sent.' : 'Subscribed successfully!');
      e.target.reset();
    }, 1500);
  };

  const quickLinks = [
    { name: 'About Us', href: '/about-us' },
    { name: 'Admissions', href: '/admission' },
    { name: 'Academic Calendar', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Student Portal', href: 'results-portal' },
  ];

  const SocialIcon = ({ Icon, label, href }) => (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-[#F7F7E8] hover:text-[#FFFDD0] transform hover:scale-110 transition duration-300" // Hover Scale Animation
      aria-label={label}
    >
      <Icon className="h-6 w-6" />
    </a>
  );

  const PrimaryButton = ({ children, onClick, type = 'submit' }) => (
    <button
      type={type}
      onClick={onClick}
      // Accent Cream Button with Navy Text, Hover Animation
      className="w-full mt-2 md:w-auto md:mt-0 px-6 py-3 bg-[#FFFDD0] text-[#0A1931] font-semibold rounded-lg shadow-md transition duration-300 hover:bg-white hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#FFFDD0]/50"
    >
      {children}
    </button>
  );

  return (
    <footer className="bg-[#0A1931] text-white pt-16 pb-4 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 text-center md:text-left">

          {/* Section 1: Quick Links */}
          <section>
            <h4 className="text-xl font-semibold text-[#FFFDD0] border-b-2 border-[#FFFDD0] pb-2 mb-6 inline-block">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index} className="text-[#F7F7E8] hover:text-white transition duration-300 transform hover:translate-x-1"> {/* Link Hover Slide */}
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 2: Contact Form */}
          <section className="lg:col-span-1">
            <h4 className="text-xl font-semibold text-[#FFFDD0] border-b-2 border-[#FFFDD0] pb-2 mb-6 inline-block">Send Us a Message</h4>
            <form onSubmit={(e) => handleFormSubmit(e, 'contact')} className="space-y-4">
              <input type="text" placeholder="Your Name" required className="w-full p-3 rounded-lg bg-[#1a3350] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFFDD0] focus:outline-none transition duration-300" />
              <input type="email" placeholder="Your Email" required className="w-full p-3 rounded-lg bg-[#1a3350] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFFDD0] focus:outline-none transition duration-300" />
              <textarea rows="3" placeholder="Your Message" required className="w-full p-3 rounded-lg bg-[#1a3350] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFFDD0] focus:outline-none transition duration-300 resize-none"></textarea>
              <PrimaryButton>
                <Send className="w-4 h-4 inline-block mr-2" />
                Send Message
              </PrimaryButton>
              <p className="mt-2 text-sm text-[#FFFDD0]">{contactStatus}</p>
            </form>
          </section>

          {/* Section 3: Subscription & CTA */}
          <section>
            <h4 className="text-xl font-semibold text-[#FFFDD0] border-b-2 border-[#FFFDD0] pb-2 mb-6 inline-block">Subscribe for Updates</h4>
            <form onSubmit={(e) => handleFormSubmit(e, 'subscribe')} className="space-y-4">
              <div className="relative">
                <input type="email" placeholder="Enter Your Email" required className="w-full p-3 rounded-lg bg-[#1a3350] text-white placeholder-gray-400 pr-10 focus:ring-2 focus:ring-[#FFFDD0] focus:outline-none transition duration-300" />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <PrimaryButton>Subscribe</PrimaryButton>
              <p className="mt-2 text-sm text-[#FFFDD0]">{subscribeStatus}</p>
            </form>
            
            <div className="mt-8 pt-4 border-t border-[#1a3350]">
              <h4 className="text-xl font-semibold text-[#FFFDD0] mb-4">Start Your Journey</h4>
              <a 
                href="#" 
                className="block text-center px-6 py-3 bg-white text-[#0A1931] font-bold text-lg rounded-lg shadow-2xl transition duration-500 transform hover:scale-105" // CTA Button Hover Effect
              >
                APPLY NOW
              </a>
            </div>
          </section>

          {/* Section 4: Social Media */}
          <section>
            <h4 className="text-xl font-semibold text-[#FFFDD0] border-b-2 border-[#FFFDD0] pb-2 mb-6 inline-block">Connect With Us</h4>
            <p className="text-[#F7F7E8] mb-6">Follow our community for the latest news and photos.</p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <SocialIcon Icon={Facebook} label="Facebook" href="#" />
              <SocialIcon Icon={Twitter} label="Twitter" href="#" />
              <SocialIcon Icon={Instagram} label="Instagram" href="#" />
              <SocialIcon Icon={Linkedin} label="LinkedIn" href="#" />
            </div>
          </section>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#1a3350] pt-6 mt-6 text-center text-sm text-[#F7F7E8]">
          <p>&copy; {currentYear} SCHOOL GATE ACADEMY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;