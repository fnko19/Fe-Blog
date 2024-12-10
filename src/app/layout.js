import localFont from "next/font/local";
import Navbar from "@/components/Navbar";

import "./globals.css";
import { AuthContextProvider } from "@/utils/AuthContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "SenpaiSays",
  description: "Senpai Bertanya Kouhai Menjawab",
};

export default function RootLayout({ children }) {
  return (
    <AuthContextProvider>
      <html lang="en">
        <head>
          <link rel="stylesheet" href="/styles/global.css" />
        </head>
        <body>
          <main>{children}</main>
        </body>
      </html>
    </AuthContextProvider>
  );
}
