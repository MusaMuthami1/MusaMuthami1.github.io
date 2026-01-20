import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provder";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import "./globals.css";

const nunito = localFont({
  src: "./fonts/Nunito/Nunito-VariableFont_wght.ttf",
  display: "swap",
  variable: "--font-nunito",
});

const thasadith = localFont({
  src: [
    {
      path: "./fonts/Thasadith/Thasadith-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Thasadith/Thasadith-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Thasadith/Thasadith-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Thasadith/Thasadith-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-thasadith",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://musamuthami.dev"),
  title: "Musa Muthami | Software Developer Portfolio",
  description: "Hey! I'm Musa Muthami, Software Developer at SafeTek Solutions",
  keywords: [
    "Musa Muthami",
    "Software Developer",
    "Flutter Developer",
    "Mobile App Developer",
    "React Developer",
    "Next.js Developer",
    "USSD Development",
    "JavaScript",
    "TypeScript",
    "Dart",
    "Swift",
    "Web Developer",
    "Portfolio",
    "SafeTek Solutions",
    "M-Pesa Integration",
  ],
  authors: [
    {
      name: "Musa Muthami",
      url: "https://github.com/MuthamiM",
    },
  ],
  creator: "Musa Muthami",
  publisher: "Musa Muthami",

  openGraph: {
    title: "Musa Muthami | Software Developer Portfolio",
    description: "Musa Muthami - Software Developer at SafeTek Solutions",
    url: "https://musamuthami.dev",
    siteName: "Musa Muthami",
    images: [
      {
        url: "https://musamuthami.dev/images/profile.JPG",
        width: 1200,
        height: 630,
        alt: "Musa Muthami Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Musa Muthami | Software Developer Portfolio",
    description: "Musa Muthami - Software Developer at SafeTek Solutions",
    images: ["https://musamuthami.dev/images/profile.JPG"],
    creator: "@SkiNnyWallk",
  },

  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.variable} ${thasadith.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
