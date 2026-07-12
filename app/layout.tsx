import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SPNIX",
    template: "%s | SPNIX",
  },
  description: "Digital Infrastructure for Growing Businesses",
  applicationName: "SPNIX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${inter.variable} ${geistMono.variable}`}
    >
      <body>
<ThemeProvider>
  {children}
  <Toaster richColors position="top-right" />
</ThemeProvider>
</body>
    </html>
  );
}