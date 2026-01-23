import type { Metadata } from "next";
import { jetbrains, jakarta, urbanist } from "@/lib/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Fiorenza's personal portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrains.variable} ${jakarta.variable} ${urbanist.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
