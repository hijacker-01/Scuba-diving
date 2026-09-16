'use client';

import { motion } from 'framer-motion';

const stats = [
  { number: '5,000+', label: 'Happy Divers', icon: '🤿', color: 'from-ocean-500 to-cyan-500' },
  { number: '15+', label: 'Years Experience', icon: '⭐', color: 'from-amber-500 to-orange-500' },
  { number: '500+', label: 'Dives Completed', icon: '✅', color: 'from-green-500 to-emerald-500' },
  { number: '99%', label: 'Satisfaction Rate', icon: '💯', color: 'from-purple-500 to-pink-500' },
];

const Stats = () => {
  return (
    <div className="py-24 relative overflow-hidden">
      {/* Background Image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/stats-bg.jpg")' }}
      />
      <div className="absolute inset-0 bg-black/80" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">By The Numbers</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Trusted by thousands of divers worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="glass-dark rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="text-5xl mb-4">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
