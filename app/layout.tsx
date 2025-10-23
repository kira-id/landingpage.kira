import type { Metadata } from "next";

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
      <head>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
