import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { Booking } from '@/lib/models/Booking';
import { connectDB } from '@/lib/db';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();

    if (req.method === 'GET') {
      const { authorization } = req.headers;
      
      if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const bookings = await Booking.find().sort({ createdAt: -1 }).limit(100);
      return res.status(200).json({ bookings });
    }

    if (req.method === 'POST') {
      const { name, email, phone, activity, date, participants } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const booking = await Booking.create({
        name,
        email,
        phone,
        activity,
        date,
        participants,
        status: 'pending',
        totalPrice: 0,
      });

      return res.status(201).json({ booking });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Bookings API error:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
}

export default handler;
