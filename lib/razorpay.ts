const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';

export const razorpay = {
  getKeyId: () => RAZORPAY_KEY_ID,
  getKeySecret: () => RAZORPAY_KEY_SECRET,
  isConfigured: () => RAZORPAY_KEY_ID.length > 0 && RAZORPAY_KEY_SECRET.length > 0,
};

export default razorpay;
