// layout.ts
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: "Joseph Anyaegbunam | Software Developer",
    template: "%s | Joseph Anyaegbunam",
  },
  description:
    "Software developer specializing in blockchain solutions, smart contracts, and full-stack web development. Based in Aberdeen.",
  metadataBase: new URL("https://joseph-anyaegbunam.dev"),

  // Keywords
  keywords: [
    "Software Developer",
    "Full Stack Developer",
    "Blockchain Developer",
    "Smart Contract Developer",
    "Web Development",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "JavaScript",
    "Solidity",
    "Aberdeen Developer",
    "Joseph Anyaegbunam",
  ],

  // Authors and other info
  authors: [{ name: "Joseph Anyaegbunam" }],
  creator: "Joseph Anyaegbunam",
  publisher: "Joseph Anyaegbunam",

  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
    ],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
