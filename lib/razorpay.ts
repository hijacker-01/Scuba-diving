import Razorpay from 'razorpay';

let instance: Razorpay | null = null;

export function getRazorpayInstance(): Razorpay {
  if (!instance) {
    instance = new Razorpay({
      key_id: process.env.RAZZORPAY_KEY_ID || 'rzp_test_placeholder',
      key_secret: process.env.RAZZORPAY_KEY_SECRET || 'rzp_test_placeholder_secret',
    });
  }
  return instance;
}
