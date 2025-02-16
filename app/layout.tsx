import type { Metadata } from "next";
import { Space_Grotesk, Chakra_Petch } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { basePath } from "@/lib/utils";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const chakraPetch = Chakra_Petch({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ERC-7412",
  description: "Use oracle data onchain",
  openGraph: {
    images: [
      {
        url: `${basePath}/og.png`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} font-sans antialiased ${chakraPetch.className}`}>
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
