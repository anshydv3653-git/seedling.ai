import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SparkVenture AI | Student Micro-Grants & AI Venture Audit',
  description:
    'AI-evaluated student micro-grants powered by Google Gemini 2.5 Flash and secure PayPal sandbox backing.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#F4F4F0] text-[#0B0B0E] min-h-screen">
        {children}
      </body>
    </html>
  );
}