'use client';

import { motion } from 'framer-motion';

const courses = [
  { title: 'Discover Scuba', level: 'Beginner', duration: '1 Day', maxDepth: '12m', price: '₹8,500', image: '/images/activities1.jpg', bgColor: '#00c6ac' },
  { title: 'Open Water Diver', level: 'Certified', duration: '3-4 Days', maxDepth: '18m', price: '₹25,000', image: '/images/gallery1.jpg', bgColor: '#005093' },
  { title: 'Advanced Open Water', level: 'Advanced', duration: '2-3 Days', maxDepth: '30m', price: '₹35,000', image: '/images/gallery2.jpg', bgColor: '#00838f' },
  { title: 'Rescue Diver', level: 'Professional', duration: '3-4 Days', maxDepth: '30m', price: '₹45,000', image: '/images/gallery3.jpg', bgColor: '#00c6ac' },
];

const Courses = () => {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#00c6ac' }}>PADI Courses</span>
          <h2 className="text-5xl md:text-6xl font-black mt-3" style={{ color: '#0a2540' }}>
            Choose Your <span className="gradient-text">Path</span>
          </h2>
          <p className="text-lg mt-4 max-w-2xl mx-auto" style={{ color: '#425466' }}>
            From your first breath underwater to professional diving
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover shadow-lg"
            >
              <div className="relative h-52 overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg" style={{ backgroundColor: course.bgColor }}>
                    🤿
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-1" style={{ color: '#0a2540' }}>{course.title}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-black" style={{ color: '#00c6ac' }}>{course.price}</span>
                  <button className="px-4 py-2 rounded-full text-sm font-bold text-white" style={{ backgroundColor: course.bgColor }}>
                    Details
                  </button>
                </div>
                <div className="mt-4 flex gap-4 text-xs" style={{ color: '#425466' }}>
                  <span>⏱ {course.duration}</span>
                  <span>📏 {course.maxDepth}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
