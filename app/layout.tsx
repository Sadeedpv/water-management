import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "@/app/components/Provider";
import { createContext, useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Water Manager",
  description: "Managing the water resource at your home, school or anywhere",
  creator: "sadeedpv",
  keywords: [
    "water",
    "water resource",
    "water resource manager",
    "sustainable development",
  ],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <Provider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
        </html>
    </Provider>
  );
}
