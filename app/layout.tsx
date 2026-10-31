import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SparkVenture AI | Sovereign Student Capital & Code Diligence',
  description:
    'Autonomous micro-grants for student software builders backed by Google Gemini diligence and verified PayPal sandbox rails.',
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
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Cinzel:wght@600;700;800;900&family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#07080B] text-[#F3F4F6] min-h-screen selection:bg-[#D8FF36] selection:text-black">
        {children}
      </body>
    </html>
  );
}