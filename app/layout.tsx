import type { Metadata, Viewport } from "next";
import { BRAND_BACKGROUND_COLOR } from "@/lib/theme";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: BRAND_BACKGROUND_COLOR },
    { media: "(prefers-color-scheme: dark)", color: BRAND_BACKGROUND_COLOR },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ backgroundColor: BRAND_BACKGROUND_COLOR }}>
      <body className="antialiased" style={{ backgroundColor: BRAND_BACKGROUND_COLOR }}>
        {children}
      </body>
    </html>
  );
}
