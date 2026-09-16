export default function Courses() {
  const courses = [
    {
      image: '/images/activities1.jpg',
      badge: 'Beginner',
      title: 'Open Water Diver',
      description: 'Your first step into the underwater world. Learn essential diving skills and earn your globally recognized certification.',
      duration: '3-4 days',
    },
    {
      image: '/images/activities2.jpg',
      badge: 'Intermediate',
      title: 'Advanced Open Water',
      description: 'Take your diving to the next level with specialized training in deep diving, navigation, and night diving.',
      duration: '2-3 days',
    },
    {
      image: '/images/gallery5.jpg',
      badge: 'Professional',
      title: 'Rescue Diver',
      description: 'Learn to prevent and manage problems in the water. Build confidence and readiness to assist fellow divers.',
      duration: '3-4 days',
    },
  ];

  return (
    <section id="courses" className="courses">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Our Programs</span>
          <h2 className="section-title">Choose Your Course</h2>
          <p className="section-description">
            Whether you are a beginner or a seasoned diver, we have a course tailored for you. All equipment included.
          </p>
        </div>
        <div className="courses-grid">
          {courses.map((course) => (
            <div className="course-card" key={course.title}>
              <div className="course-image">
                <img src={course.image} alt={course.title} loading="lazy" />
                <span className="course-badge">{course.badge}</span>
              </div>
              <div className="course-body">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-meta">
                  <span className="course-duration"><i className="far fa-clock"></i> {course.duration}</span>
                  <a href="#contact" className="btn btn-primary">Sign Up</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
