export default function Features() {
  const features = [
    {
      icon: 'fas fa-award',
      title: 'PADI 5-Star',
      description: 'World-renowned certification. Our instructors are PADI-certified with years of underwater experience.',
    },
    {
      icon: 'fas fa-clock',
      title: '5+ Years Experience',
      description: 'Over five years of guiding divers through the breathtaking reefs of the Andaman Islands.',
    },
    {
      icon: 'fas fa-umbrella-beach',
      title: '1000+ Trips',
      description: 'We have conducted over a thousand diving trips across Havelock and Neil Islands.',
    },
    {
      icon: 'fas fa-users',
      title: 'Expert Instructors',
      description: 'Our team of certified professionals ensures safe, fun, and memorable diving experiences.',
    },
  ];

  return (
    <section id="features" className="features" style={{ backgroundImage: "url('/images/stats-bg.jpg')" }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Why Choose Us</span>
          <h2 className="section-title">Experience the Best of Diving</h2>
          <p className="section-description">
            With years of expertise and a passion for the ocean, we provide world-class scuba diving experiences for all levels.
          </p>
        </div>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon"><i className={f.icon}></i></div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
