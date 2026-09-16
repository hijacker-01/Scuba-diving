import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Courses from '@/components/Courses';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import BookingCTA from '@/components/BookingCTA';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main>
      <section id="home"><Hero /></section>
      <div className="wave-section">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <path d="M0 50C360 100 720 0 1080 50C1260 75 1380 50 1440 50V0H0V50Z" fill="#ffffff" />
        </svg>
      </div>
      <section id="features"><Features /></section>
      <div className="wave-section">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <path d="M0 50C360 0 720 100 1080 50C1260 25 1380 50 1440 50V100H0V50Z" fill="#f8f9fa" />
        </svg>
      </div>
      <section id="courses"><Courses /></section>
      <section id="gallery"><Gallery /></section>
      <section id="testimonials"><Testimonials /></section>
      <BookingCTA />
      <section id="contact"><Contact /></section>
    </main>
  );
}
