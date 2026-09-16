'use client';

import { motion } from 'framer-motion';

const stats = [
  { num: '5,000+', label: 'Happy Divers' },
  { num: '15+', label: 'Years Exp' },
  { num: '500+', label: 'Dives Done' },
  { num: '99%', label: 'Satisfaction' },
];

const Testimonials = () => {
  const testimonials = [
    { name: 'Sarah Johnson', role: 'Certified Diver', text: 'Absolutely incredible! The instructors were professional and the coral reefs were breathtaking. Already booked my next trip!', avatar: 'SJ', bgColor: '#00c6ac' },
    { name: 'Michael Chen', role: 'Advanced Diver', text: 'Best diving experience in the Andamans. The night dive was magical and the marine life was stunning!', avatar: 'MC', bgColor: '#005093' },
    { name: 'Emily Rodriguez', role: 'Beginner', text: 'As a beginner, the team made me so comfortable. My Open Water certification felt amazing!', avatar: 'ER', bgColor: '#00c6ac' },
    { name: 'James Wilson', role: 'Photographer', text: 'The underwater photography was unforgettable. Got shots I never thought possible!', avatar: 'JW', bgColor: '#005093' },
  ];

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#00c6ac' }}>Testimonials</span>
          <h2 className="text-5xl md:text-6xl font-black mt-3" style={{ color: '#0a2540' }}>
            What Our <span className="gradient-text">Divers Say</span>
          </h2>
          <p className="text-lg mt-4 max-w-2xl mx-auto" style={{ color: '#425466' }}>
            Real stories from our community of divers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl p-6 card-hover shadow-lg"
            >
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(i => <span key={i} className="text-base" style={{ color: '#00c6ac' }}>★</span>)}
              </div>
              <p className="text-sm mb-6 italic leading-relaxed" style={{ color: '#425466' }}>"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg" style={{ backgroundColor: t.bgColor }}>
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-sm" style={{ color: '#0a2540' }}>{t.name}</h4>
                  <p className="text-sm" style={{ color: '#425466' }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="text-center bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="text-4xl font-black gradient-text">{stat.num}</div>
                <div className="text-sm font-semibold mt-2" style={{ color: '#0a2540' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
