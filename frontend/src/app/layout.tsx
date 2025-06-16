import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/common/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
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
        url: "",
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
          "flex flex-col min-h-screen bg-gray-50 text-gray-900 antialiased",
          poppins.variable
        )}
      >
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}