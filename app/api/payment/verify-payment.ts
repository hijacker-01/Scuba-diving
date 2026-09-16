import { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      // Save booking to database would go here
      res.status(200).json({ verified: true, message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ verified: false, message: 'Invalid signature' });
    }
  } catch (error: any) {
    console.error('Payment verification failed:', error);
    res.status(500).json({ error: 'Verification failed', details: error.message });
  }
}
