import Razorpay from 'razorpay';
import { NextApiRequest, NextApiResponse } from 'next';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, name, email, phone, activity, date, participants } = req.body;

    if (!amount || !name || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        name,
        email,
        phone,
        activity,
        date,
        participants: String(participants),
      },
    });

    res.status(200).json({ order });
  } catch (error: any) {
    console.error('Order creation failed:', error);
    res.status(500).json({ error: 'Failed to create order', details: error.message });
  }
}
