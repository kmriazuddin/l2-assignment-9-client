import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "@/providers/Provider";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "sonner";
import ReduxProvider from "@/providers/ReduxProvider";

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
  title: "FindX Shop Bangladesh",
  description: "findxshop.com.bd",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <Provider>
            <Toaster></Toaster>
            <AuthProvider>{children}</AuthProvider>
          </Provider>
        </ReduxProvider>
      </body>
    </html>
  );
}
