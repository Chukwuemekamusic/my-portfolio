// layout.ts
import type { Metadata } from "next";
import { Instrument_Serif, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: "Joseph Anyaegbunam | Software Developer",
    template: "%s | Joseph Anyaegbunam",
  },
  description:
    "Backend and full-stack engineer with a track record in production APIs, data pipelines, and smart contract systems.",
  metadataBase: new URL("https://joseph-anyaegbunam.dev"),

  // Keywords
  keywords: [
    "Software Developer",
    "Backend Engineer",
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
        className={`${instrumentSerif.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
