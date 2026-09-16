'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Club Logo Component
const ClubLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    {/* Whale/Orca Shape */}
    <ellipse cx="20" cy="20" rx="18" ry="14" fill="#00c6ac" />
    {/* Orca body details */}
    <ellipse cx="20" cy="20" rx="14" ry="10" fill="#0a2540" opacity="0.5" />
    {/* Eye */}
    <circle cx="26" cy="17" r="2.5" fill="#fff" />
    <circle cx="26.5" cy="17" r="1.2" fill="#0a2540" />
    {/* Fins */}
    <path d="M5 18 Q8 12 12 16 Q10 20 5 22Z" fill="#0a2540" opacity="0.7" />
    <path d="M35 18 Q32 12 28 16 Q30 20 35 22Z" fill="#0a2540" opacity="0.7" />
    {/* Tail */}
    <path d="M37 20 Q39 16 40 18 Q39 22 37 20Z" fill="#0a2540" opacity="0.7" />
    {/* Water splash */}
    <circle cx="10" cy="30" r="2" fill="#00c6ac" opacity="0.5" />
    <circle cx="15" cy="33" r="1.5" fill="#00c6ac" opacity="0.4" />
    <circle cx="30" cy="31" r="1.8" fill="#00c6ac" opacity="0.4" />
  </svg>
);

const links = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#courses', label: 'Courses' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#trips', label: 'Trips' },
  { href: '#booking', label: 'Book Now' },
  { href: '#contact', label: 'Contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-3 shadow-lg' : 'py-4'
      }`}
      style={{ backgroundColor: scrolled ? 'rgba(255,255,255,0.65)' : 'transparent' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="#hero" className="flex items-center gap-3">
          <ClubLogo />
          <div>
            <span className="text-lg font-bold" style={{ color: '#0a2540' }}>Havelock</span>
            <br />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#00c6ac' }}>Dive Club</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={e => handleClick(e, l.href)}
              className="text-sm font-semibold uppercase tracking-wider hover:text-[#00c6ac] transition-all duration-300"
              style={{ color: '#0a2540' }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a href="#booking" onClick={e => handleClick(e, '#booking')} className="hidden md:inline-flex btn-primary text-xs">
          Book a Dive
        </a>

        {/* Mobile */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-[#0a2540] p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden glass mx-4 mt-2 rounded-xl"
      >
        <div className="flex flex-col p-4 gap-2">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={e => handleClick(e, l.href)}
              className="text-[#0a2540] py-2 text-sm font-medium hover:text-[#00c6ac] transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#booking" onClick={e => handleClick(e, '#booking')} className="mt-2 btn-primary text-center text-xs">
            Book a Dive
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
export { ClubLogo };
