import Link from 'next/link';

export default function BookingCTA() {
  return (
    <section className="cta">
      <div className="container">
        <h2 className="cta-title">Ready to Dive In?</h2>
        <p className="cta-description">
          Book your scuba diving experience today and create memories that will last a lifetime.
        </p>
        <Link href="#contact" className="btn btn-primary">Book Now</Link>
      </div>
    </section>
  );
}
