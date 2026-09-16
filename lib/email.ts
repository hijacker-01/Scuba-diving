import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: from || process.env.SMTP_FROM || 'noreply@havelockdiveclub.com',
      to,
      subject,
      html,
    });
    console.log('✅ Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return { success: false, error };
  }
}

export async function sendBookingConfirmation(
  to: string,
  data: { name: string; activity: string; date: string; participants: number; totalPrice: number }
) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #0284c7; text-align: center;">🌊 Havelock Dive Club</h1>
      <h2 style="color: #333;">Booking Confirmation</h2>
      <p>Dear ${data.name},</p>
      <p>Your dive adventure has been confirmed! 🎉</p>
      
      <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3 style="color: #0284c7;">Booking Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px;"><strong>Activity:</strong></td><td>${data.activity}</td></tr>
          <tr><td style="padding: 8px;"><strong>Date:</strong></td><td>${data.date}</td></tr>
          <tr><td style="padding: 8px;"><strong>Participants:</strong></td><td>${data.participants}</td></tr>
          <tr><td style="padding: 8px;"><strong>Total Price:</strong></td><td>₹${data.totalPrice}</td></tr>
        </table>
      </div>
      
      <p>Thank you for choosing Havelock Dive Club!</p>
      <p>See you underwater! 🤿</p>
    </div>
  `;

  return sendEmail({
    to,
    subject: '✅ Your Booking is Confirmed - Havelock Dive Club',
    html,
  });
}

export async function testEmailConnection() {
  try {
    await transporter.verify();
    console.log('✅ Email service connected');
    return true;
  } catch (error) {
    console.error('❌ Email connection failed:', error);
    return false;
  }
}

export default { sendEmail, sendBookingConfirmation, testEmailConnection };
