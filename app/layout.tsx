import type { Metadata } from "next";
import "./tailwind.css";

export const metadata: Metadata = {
  title: "Kira.id Intelligence",
  description:
    "Open-source research collective focused on practical steps toward Artificial General Intelligence.",
  icons: {
    icon: "/kira.svg",
    shortcut: "/kira.svg",
    apple: "/kira.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
