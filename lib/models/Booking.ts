import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  activity: { type: String, required: true },
  date: { type: String, required: true },
  participants: { type: Number, default: 1 },
  experience: { type: String, default: 'Beginner' },
  totalPrice: { type: Number, default: 0 },
  paymentId: { type: String },
  razorpayOrderId: { type: String },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

BookingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

export default Booking;
