'use client';

import { motion } from 'framer-motion';
import { ClubLogo } from './Navbar';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #ebfbff 0%, #e0f7fa 40%, #b2ebf2 100%)' }}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src="/images/hero1.jpg" alt="Dive" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="mb-6">
          <span className="inline-block px-5 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: '#00c6ac20', color: '#00c6ac' }}>
            🐋 PADI 5-Star Certified Dive Center
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <span style={{ color: '#0a2540' }}>Experience the</span>
          <br />
          <span className="gradient-text">Underwater Paradise</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-light"
          style={{ color: '#425466' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Discover the pristine coral reefs and vibrant marine life of Havelock Island,
          Andaman Islands. Professional PADI certified diving for all levels.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <a href="#booking" className="btn-primary text-base px-8 py-4">
            Book Your Dive →
          </a>
          <a href="#courses" className="btn-outline text-base px-8 py-4">
            Explore Courses
          </a>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="flex justify-center gap-12 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          {[
            { num: '5,000+', label: 'Happy Divers' },
            { num: '15+', label: 'Years Exp' },
            { num: '500+', label: 'Dives Done' },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-black gradient-text">{stat.num}</div>
              <div className="text-sm mt-1 font-medium" style={{ color: '#425466' }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg className="w-6 h-6 text-[#00c6ac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
