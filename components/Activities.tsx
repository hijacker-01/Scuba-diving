'use client';

import { motion } from 'framer-motion';

const activities = [
  { title: 'Scuba Diving', price: '₹4,500', level: 'Beginner to Advanced', image: '/images/activities1.jpg', icon: '🐠' },
  { title: 'Snorkeling', price: '₹2,500', level: 'All Ages', image: '/images/activities2.jpg', icon: '🏄' },
  { title: 'Night Diving', price: '₹6,000', level: 'Intermediate+', image: '/images/gallery3.jpg', icon: '🌙' },
  { title: 'Underwater Photography', price: '₹7,500', level: 'All Levels', image: '/images/gallery4.jpg', icon: '📷' },
  { title: 'Coral Reef Exploration', price: '₹5,500', level: 'Intermediate', image: '/images/gallery5.jpg', icon: '🐡' },
  { title: 'Private Charter', price: '₹15,000', level: 'Custom', image: '/images/gallery6.jpg', icon: '🚤' },
];

const Activities = () => {
  return (
    <div className="py-24" style={{ backgroundColor: '#ebfbff' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#00c6ac' }}>Our Activities</span>
          <h2 className="text-5xl md:text-6xl font-black mt-3" style={{ color: '#0a2540' }}>
            Discover What <span className="gradient-text">Awaits</span>
          </h2>
          <p className="text-lg mt-4 max-w-2xl mx-auto" style={{ color: '#425466' }}>
            From beginners to pros, we have the perfect underwater adventure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group bg-white rounded-2xl overflow-hidden cursor-pointer card-hover shadow-lg"
            >
              <div className="relative h-64 overflow-hidden">
                <img src={activity.image} alt={activity.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/70 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 w-14 h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl shadow-lg">
                  {activity.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1" style={{ color: '#0a2540' }}>{activity.title}</h3>
                <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: '#f0f0f0' }}>
                  <span className="text-2xl font-black" style={{ color: '#00c6ac' }}>{activity.price}</span>
                  <span className="text-xs bg-[#00c6ac]/10 text-[#00c6ac] px-3 py-1 rounded-full font-bold">{activity.level}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activities;
