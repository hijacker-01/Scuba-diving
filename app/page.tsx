'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Activities from '@/components/Activities';
import Courses from '@/components/Courses';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Booking from '@/components/Booking';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// WhatsApp Chat Button
const WhatsAppButton = () => (
  <a
    href="https://wa.me/919434290393?text=Hi%20there%2C%20I%20need%20help%20with%20my%20dive%20booking"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#00c6ac] hover:bg-[#005093] text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
    style={{ animation: 'pulse 2s infinite' }}
  >
    <i className="fab fa-whatsapp text-xl" />
    <span className="text-sm font-bold hidden sm:inline">Chat with Us</span>
  </a>
);

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loader = setTimeout(() => setLoading(false), 1500);
    if (containerRef.current) {
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl.from('.hero-title', { y: 100, opacity: 0, duration: 1.5, delay: 1.5 })
        .from('.hero-subtitle', { y: 50, opacity: 0, duration: 1.2 }, '-=0.8')
        .from('.hero-cta', { y: 30, opacity: 0, duration: 1 }, '-=0.6');

      const sections = containerRef.current.querySelectorAll('section');
      sections.forEach(section => {
        gsap.from(section.querySelectorAll('.animate-on-scroll'), {
          scrollTrigger: { trigger: section, start: 'top 80%', end: 'bottom 20%', toggleActions: 'play none none reverse' },
          y: 60, opacity: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
        });
      });
      return () => { ScrollTrigger.getAll().forEach(t => t.kill()); clearTimeout(loader); };
    }
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#ebfbff] flex items-center justify-center z-50">
        <div className="text-center">
          <div className="loader-spinner mx-auto mb-4" />
          <p className="text-[#00c6ac] font-bold tracking-wider">HAVELOCK DIVE</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <Navbar />
      <main>
        <section id="hero"><Hero /></section>
        <section id="about" className="py-24" style={{ backgroundColor: '#fff' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white rounded-3xl shadow-lg p-12 md:p-16 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <span className="text-sm font-bold uppercase tracking-widest text-[#00c6ac]">About Us</span>
                <h2 className="text-4xl md:text-5xl font-black mt-3" style={{ color: '#0a2540' }}>
                  Your Adventure <span className="gradient-text">Starts Here</span>
                </h2>
                <p className="mt-4 leading-relaxed" style={{ color: '#425466' }}>
                  Welcome to Havelock Dive Club, the premier PADI 5-star certified dive center in the Andaman Islands.
                  With over 15 years of combined experience, our expert instructors are passionate about sharing
                  the beauty of the underwater world with divers of all levels.
                </p>
                <div className="flex gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-black gradient-text">5,000+</div>
                    <div className="text-sm font-semibold" style={{ color: '#425466' }}>Happy Divers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black gradient-text">15+</div>
                    <div className="text-sm font-semibold" style={{ color: '#425466' }}>Years Exp</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black gradient-text">PADI 5★</div>
                    <div className="text-sm font-semibold" style={{ color: '#425466' }}>Certified</div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <img src="/images/hero1.jpg" alt="About" className="w-full h-80 object-cover rounded-2xl shadow-lg" />
              </div>
            </div>
          </div>
        </section>
        <section id="activities"><Activities /></section>
        <section id="courses"><Courses /></section>
        <section id="gallery"><Gallery /></section>
        <section id="testimonials"><Testimonials /></section>
        <section id="booking"><Booking /></section>
        <section id="contact"><Contact /></section>
        <WhatsAppButton />
      </main>
      <Footer />
    </div>
  );
}
