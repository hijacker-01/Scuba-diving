'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); setTimeout(() => setSubmitted(false), 3000); };

  if (submitted) {
    return (
      <div className="py-24 text-center" style={{ backgroundColor: '#ebfbff' }}>
        <div className="text-7xl mb-4">✉️</div>
        <h2 className="text-4xl font-black gradient-text mb-4">Message Sent!</h2>
        <p className="text-lg" style={{ color: '#425466' }}>We'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="py-24" style={{ backgroundColor: '#ebfbff' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#00c6ac' }}>Contact Us</span>
          <h2 className="text-5xl md:text-6xl font-black mt-3" style={{ color: '#0a2540' }}>
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-lg mt-4 max-w-2xl mx-auto" style={{ color: '#425466' }}>
            Have questions? We're here to help you plan your perfect dive adventure
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            {[
              { icon: '📱', title: 'Phone', value: '+91-9434290393 / 9679572772' },
              { icon: '📧', title: 'Email', value: 'info@havelockdiveclub.com' },
              { icon: '📍', title: 'Location', value: 'Havelock Island, Andaman Islands' },
              { icon: '📷', title: 'Instagram', value: '@havelockdiveclub' },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="flex items-start gap-4 bg-white rounded-xl p-5 card-hover shadow">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h4 className="font-bold text-sm" style={{ color: '#00c6ac' }}>{item.title}</h4>
                  <p className="font-semibold" style={{ color: '#0a2540' }}>{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div><label className="block text-sm font-bold mb-2" style={{ color: '#0a2540' }}>Your Name</label><input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#00c6ac] focus:outline-none text-[#0a2540]" placeholder="Your name" /></div>
            <div><label className="block text-sm font-bold mb-2" style={{ color: '#0a2540' }}>Email</label><input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#00c6ac] focus:outline-none text-[#0a2540]" placeholder="you@example.com" /></div>
            <div><label className="block text-sm font-bold mb-2" style={{ color: '#0a2540' }}>Message</label><textarea name="message" required rows={5} value={formData.message} onChange={handleChange} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#00c6ac] focus:outline-none text-[#0a2540] placeholder-gray-400 resize-none" placeholder="Tell us about your dive plans..."></textarea></div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full py-4 rounded-2xl text-white font-bold text-lg transition-all shadow-lg hover:shadow-xl" style={{ backgroundColor: '#0a2540', boxShadow: '0 20px 30px rgba(172,172,172,0.4)' }}>Send Message</motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
