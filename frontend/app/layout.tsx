import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VerityGuard",
  description: "AI-Powered Fact Verification Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
