import type React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // ✅ use Poppins
import QueryProvider from "@/components/QueryProvider";
import { ThemeProvider } from "@/components/theme-providers";
// ---Import Css siles---//
import "./globals.css";
import "./fonts.css";
import "./swiper.css";

import { Toaster } from "@/components/ui/sonner";

// ✅ Configure Poppins (choose the weights you need)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"], // add as required
});

export const metadata: Metadata = {
  title: "Kinddom - Victory's Song",
  description:
    "I built my church on this rock and the realms of hell will not prevail against me  ",
};

// Create a client

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider dehydratedState={null}>{children}</QueryProvider>
        </ThemeProvider>
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  );
}
