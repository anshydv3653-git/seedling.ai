// app/layout.tsx
export const metadata: Metadata = {
  title: "SparkVenture | Student Micro-Grants & AI Venture Audit",
  description:
    "Student micro-grants backed by AI venture analysis and PayPal sandbox.",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SparkVenture AI | Student Micro-Grants & AI Venture Audit",
  description:
    "AI-evaluated student micro-grants powered by Google Gemini 2.5 Flash and secure PayPal sandbox backing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050B14] text-slate-100 selection:bg-cyan-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}