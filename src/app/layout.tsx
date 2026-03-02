import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gift from Riyan to Nitu",
  description: "CBSE Class 12 Board Exam Study Dashboard - A personalized study planner for Nitu",
  keywords: ["CBSE", "Class 12", "Board Exams", "Study Planner", "Dashboard"],
  authors: [{ name: "Riyan" }],
  icons: {
    icon: "/teddy-logo.png",
  },
  openGraph: {
    title: "Gift from Riyan to Nitu",
    description: "CBSE Class 12 Board Exam Study Dashboard",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gift from Riyan to Nitu",
    description: "CBSE Class 12 Board Exam Study Dashboard",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
