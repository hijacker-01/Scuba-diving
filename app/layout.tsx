import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Havelock Dive Club - Professional Scuba Diving in Andaman Islands',
  description: 'Experience the underwater paradise of Havelock Island. Book your dive adventure with professional PADI certified instructors.',
  keywords: ['scuba diving', 'Havelock Island', 'Andaman Islands', 'PADI', 'underwater'],
  authors: [{ name: 'Havelock Dive Club' }],
  openGraph: {
    title: 'Havelock Dive Club',
    description: 'Professional scuba diving in Andaman Islands',
    type: 'website',
    url: 'https://havelockdiveclub.com',
    images: ['/images/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#ebfbff] text-[#0a2540] antialiased`}>
        {/* Font Awesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        {children}
      </body>
    </html>
  );
}
