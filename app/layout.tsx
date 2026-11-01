import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SparkVenture AI | Student Micro-Grants',
  description: 'AI-reviewed micro-grants for student builders, with PayPal Sandbox payments.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#07080B] text-[#EDEDED] antialiased">
        {children}
      </body>
    </html>
  );
}