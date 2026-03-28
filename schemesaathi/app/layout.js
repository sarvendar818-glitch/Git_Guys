import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "SchemeSaathi — Every Benefit. Every Citizen.",
  description: "SchemeSaathi uses AI to find, apply & track every government scheme you're entitled to — in your language, with zero paperwork.",
};

import { LanguageProvider } from '@/context/LanguageContext'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-white min-h-screen`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
