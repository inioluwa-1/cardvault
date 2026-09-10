import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "CardVault | Gift Card Platform for African Vendors",
  description: "Create, sell, and manage custom gift cards for your customers with CardVault, the premier gift card app for African vendors.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "CardVault | Gift Card Platform for African Vendors",
    description: "Create, sell, and manage custom gift cards for your customers with CardVault, the premier gift card app for African vendors.",
    url: "https://cardvaultt.vercel.app",
    siteName: "CardVault",
    images: [
      {
        url: "/og-image.png",
        width: 800,
        height: 800,
        alt: "CardVault Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "CardVault | Gift Card Platform for African Vendors",
    description: "Create, sell, and manage custom gift cards for your customers with CardVault, the premier gift card app for African vendors.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} font-sans h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
