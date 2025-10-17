import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VerityGuard Project Generator",
  description: "Project from Orchids.app - remix-of-verityguard-project-generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
