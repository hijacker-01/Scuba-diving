export default function Testimonials() {
  const testimonials = [
    {
      avatar: '/images/hero1.jpeg',
      name: 'Sarah Johnson',
      role: 'Open Water Diver',
      text: 'Absolutely incredible experience! The instructors were patient and knowledgeable. The coral reefs were mesmerizing. Highly recommend!',
      rating: 5,
    },
    {
      avatar: '/images/hero2.jpeg',
      name: 'Michael Chen',
      role: 'Advanced Diver',
      text: 'Best dive center in the Andamans. Professional equipment, great locations, and an unforgettable underwater adventure.',
      rating: 5,
    },
    {
      avatar: '/images/hero3.jpeg',
      name: 'Priya Sharma',
      role: 'Rescue Diver',
      text: 'From my first dive to my rescue certification, the team made every moment safe and exciting. Truly a world-class experience.',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Reviews</span>
          <h2 className="section-title">What Our Divers Say</h2>
          <p className="section-description">
            Join hundreds of divers who have experienced the magic of diving in the Andaman Islands.
          </p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.name}>
              <div className="testimonial-stars">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
              </div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <img src={t.avatar} alt={t.name} className="testimonial-avatar" loading="lazy" />
                <div className="testimonial-author-info">
                  <h4>{t.name}</h4>
                  <p>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
