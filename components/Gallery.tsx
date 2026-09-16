'use client';

import { motion } from 'framer-motion';

const galleryItems = [
  { title: 'Coral Garden', location: 'Havelock Island', image: '/images/gallery1.jpg' },
  { title: 'Manta Ray', location: 'Neil Island', image: '/images/gallery2.jpg' },
  { title: 'Night Magic', location: 'Havelock Island', image: '/images/gallery3.jpg' },
  { title: 'Shipwreck', location: 'Ross Island', image: '/images/gallery4.jpg' },
  { title: 'Turtles', location: 'Havelock Island', image: '/images/gallery5.jpg' },
  { title: 'Caves', location: 'Baratang', image: '/images/gallery6.jpg' },
  { title: 'Reef Life', location: 'Havelock Island', image: '/images/activities1.jpg' },
  { title: 'Marine World', location: 'Neil Island', image: '/images/activities2.jpg' },
];

const Gallery = () => {
  return (
    <div className="py-24" style={{ backgroundColor: '#ebfbff' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#00c6ac' }}>Our Gallery</span>
          <h2 className="text-5xl md:text-6xl font-black mt-3" style={{ color: '#0a2540' }}>
            Moments <span className="gradient-text">Underwater</span>
          </h2>
          <p className="text-lg mt-4 max-w-2xl mx-auto" style={{ color: '#425466' }}>
            Stunning moments from our underwater adventures
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="break-inside-avoid rounded-xl overflow-hidden cursor-pointer bg-white card-hover shadow-lg"
            >
              <div className="relative">
                <img src={item.image} alt={item.title} className="w-full object-cover" style={{ aspectRatio: '4/3', objectPosition: 'center' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <div>
                    <h3 className="text-white font-bold">{item.title}</h3>
                    <p className="text-white/70 text-sm">{item.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
