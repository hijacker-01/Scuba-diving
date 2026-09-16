'use client';

import Link from 'next/link';

const Footer = () => {
  const scrollTo = (href: string) => { const el = document.querySelector(href); if (el) el.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <footer style={{ backgroundColor: '#0a2540', color: '#fff' }}>
      {/* Wave SVG Separator */}
      <div className="absolute top-0 left-0 w-full">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30V60H0V30Z" fill="#00c6ac" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg width="36" height="36" viewBox="0 0 40 40">
                <ellipse cx="20" cy="20" rx="18" ry="14" fill="#00c6ac" />
                <ellipse cx="20" cy="20" rx="14" ry="10" fill="#ebfbff" opacity="0.3" />
                <circle cx="26" cy="17" r="2.5" fill="#0a2540" />
                <circle cx="26.5" cy="17" r="1.2" fill="#fff" />
                <path d="M5 18 Q8 12 12 16 Q10 20 5 22Z" fill="#ebfbff" opacity="0.7" />
                <path d="M35 18 Q32 12 28 16 Q30 20 35 22Z" fill="#ebfbff" opacity="0.7" />
                <path d="M37 20 Q39 16 40 18 Q39 22 37 20Z" fill="#ebfbff" opacity="0.7" />
              </svg>
              <div>
                <span className="text-lg font-bold">Havelock</span>
                <br />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#00c6ac' }}>Dive Club</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional scuba diving experiences in the paradise of Havelock Island, Andaman Islands.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {[{ h: '#hero', l: 'Home' }, { h: '#about', l: 'About' }, { h: '#courses', l: 'Courses' }, { h: '#gallery', l: 'Gallery' }].map(l => (
                <a key={l.h} href={l.h} onClick={e => { e.preventDefault(); scrollTo(l.h); }} className="text-gray-400 hover:text-[#00c6ac] text-sm transition-colors">{l.l}</a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-4">Services</h4>
            <nav className="flex flex-col gap-2">
              {[{ h: '#booking', l: 'Book a Dive' }, { h: '#courses', l: 'PADI Courses' }, { h: '#trips', l: 'Dive Trips' }].map(l => (
                <a key={l.h} href={l.h} onClick={e => { e.preventDefault(); scrollTo(l.h); }} className="text-gray-400 hover:text-[#00c6ac] text-sm transition-colors">{l.l}</a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-400 mb-4">
              <p>📱 +91-9434290393</p>
              <p>📧 info@havelockdiveclub.com</p>
              <p>📍 Havelock Island, Andaman</p>
            </div>
            <div className="flex gap-3">
              {[['📷', 'IG'], ['📘', 'FB'], ['📺', 'YT']].map(([icon, name]) => (
                <a key={name} href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#00c6ac]/20 transition-colors text-lg text-white">{icon}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2026 Havelock Dive Club. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            {['Privacy Policy', 'Terms', 'Sitemap'].map(l => (
              <a key={l} href="#" className="text-gray-500 hover:text-[#00c6ac] transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
