import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils"; // classnames helper (optional)
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
//import { Toaster } from "@/components/ui/toaster"; // if using toast notifications

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SAFC - Meeting Scheduler",
    template: "%s | SAFC Scheduler",
  },
  description: "A smart and easy way to book SAFC meeting rooms.",
  keywords: ["meeting", "scheduler", "SAFC", "room booking"],
  authors: [{ name: "SAFC Team", url: "https://safc.org" }],
  themeColor: "#ffffff",
  openGraph: {
    title: "SAFC Meeting Scheduler",
    description: "Schedule meetings quickly and efficiently.",
    url: "https://scheduler.safc.org",
    siteName: "SAFC Scheduler",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SAFC Scheduler",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-gray-50 text-gray-900 antialiased",
           inter.variable,
           lora.variable
        )}
      >
        <Header />
        <main className="flex flex-col flex-grow container mx-auto px-4 py-6">
          {children}
        </main>
        <Footer />
        {/* <Toaster /> */}
      </body>
    </html>
  );
}
