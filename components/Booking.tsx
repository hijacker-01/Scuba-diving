'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Razorpay from 'razorpay';

const Booking = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', activity: 'Scuba Diving', date: '', participants: 1, experience: 'Beginner' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setIsProcessing(true);
    try {
      const res = await fetch('/api/payment/create-order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: 4500, ...formData }) });
      const data = await res.json();
      const rzp = new Razorpay({ key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '', amount: data.order.amount, currency: 'INR', name: 'Havelock Dive Club', description: `${formData.activity}`, order_id: data.order.id, handler: async (resp: any) => { const verify = await fetch('/api/payment/verify-payment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ razorpay_order_id: resp.razorpay_order_id, razorpay_payment_id: resp.razorpay_payment_id, razorpay_signature: resp.razorpay_signature }) }); if ((await verify.json()).verified) { setBookingSuccess(true); setFormData({ name: '', email: '', phone: '', activity: 'Scuba Diving', date: '', participants: 1, experience: 'Beginner' }); } }, prefill: { name: formData.name, email: formData.email, contact: formData.phone }, theme: { color: '#00c6ac' } }); rzp.open();
    } catch (err) { console.error(err); setIsProcessing(false); }
  };

  if (bookingSuccess) {
    return (
      <div className="py-24 text-center" style={{ backgroundColor: '#ebfbff' }}>
        <div className="text-7xl mb-4">🎉</div>
        <h2 className="text-4xl font-black gradient-text mb-4">Booking Confirmed!</h2>
        <p className="text-lg" style={{ color: '#425466' }}>Check your email for confirmation details.</p>
      </div>
    );
  }

  return (
    <div className="py-24" style={{ backgroundColor: '#ebfbff' }}>
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#00c6ac' }}>Book Now</span>
          <h2 className="text-5xl md:text-6xl font-black mt-3" style={{ color: '#0a2540' }}>
            Book Your <span className="gradient-text">Adventure</span>
          </h2>
          <p className="text-lg mt-4" style={{ color: '#425466' }}>Fill in the details below and we'll get back to you</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-bold mb-2" style={{ color: '#0a2540' }}>Full Name</label><input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-[#ebfbff] border-2 border-gray-200 rounded-xl focus:border-[#00c6ac] focus:outline-none text-[#0a2540]" placeholder="Your name" /></div>
            <div><label className="block text-sm font-bold mb-2" style={{ color: '#0a2540' }}>Email</label><input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-[#ebfbff] border-2 border-gray-200 rounded-xl focus:border-[#00c6ac] focus:outline-none text-[#0a2540]" placeholder="you@example.com" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div><label className="block text-sm font-bold mb-2" style={{ color: '#0a2540' }}>Phone</label><input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-[#ebfbff] border-2 border-gray-200 rounded-xl focus:border-[#00c6ac] focus:outline-none text-[#0a2540]" placeholder="+91-9876543210" /></div>
            <div><label className="block text-sm font-bold mb-2" style={{ color: '#0a2540' }}>Activity</label><select name="activity" value={formData.activity} onChange={handleChange} className="w-full px-4 py-3 bg-[#ebfbff] border-2 border-gray-200 rounded-xl focus:border-[#00c6ac] focus:outline-none text-[#0a2540]">{['Scuba Diving', 'Snorkeling', 'Night Diving', 'Underwater Photography', 'Coral Reef Exploration', 'Private Charter'].map(a => <option key={a} value={a}>{a}</option>)}</select></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div><label className="block text-sm font-bold mb-2" style={{ color: '#0a2540' }}>Date</label><input type="date" name="date" required value={formData.date} onChange={handleChange} className="w-full px-4 py-3 bg-[#ebfbff] border-2 border-gray-200 rounded-xl focus:border-[#00c6ac] focus:outline-none text-[#0a2540]" /></div>
            <div><label className="block text-sm font-bold mb-2" style={{ color: '#0a2540' }}>Participants</label><select name="participants" value={formData.participants} onChange={handleChange} className="w-full px-4 py-3 bg-[#ebfbff] border-2 border-gray-200 rounded-xl focus:border-[#00c6ac] focus:outline-none text-[#0a2540]">{[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n===1?'Person':'People'}</option>)}</select></div>
          </div>
          <div className="mt-6"><label className="block text-sm font-bold mb-2" style={{ color: '#0a2540' }}>Experience Level</label><select name="experience" value={formData.experience} onChange={handleChange} className="w-full px-4 py-3 bg-[#ebfbff] border-2 border-gray-200 rounded-xl focus:border-[#00c6ac] focus:outline-none text-[#0a2540]">{['Beginner', 'Intermediate', 'Advanced', 'Professional'].map(e => <option key={e} value={e}>{e}</option>)}</select></div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isProcessing} className="w-full mt-8 py-4 rounded-2xl text-white font-bold text-lg transition-all shadow-lg hover:shadow-xl" style={{ backgroundColor: '#0a2540', boxShadow: '0 20px 30px rgba(172,172,172,0.4)' }}>{isProcessing ? 'Processing...' : 'Proceed to Payment'}</motion.button>
          <p className="text-center text-sm mt-4" style={{ color: '#425466' }}>🔒 Secure payment powered by Razorpay</p>
        </form>
      </div>
    </div>
  );
};

export default Booking;
