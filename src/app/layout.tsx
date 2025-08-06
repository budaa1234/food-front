import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import FoodCartContextProvider from "@/providers/foodCard";
import UserContextProvider from "@/providers/userProvider";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Food delivery",
  description: "Pinecone food delivery app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interFont.variable} antialiased`}>
        <UserContextProvider>
        <FoodCartContextProvider>
          <main>{children}</main>
        </FoodCartContextProvider>
        </UserContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
