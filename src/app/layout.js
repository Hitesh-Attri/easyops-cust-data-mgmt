import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import connectDB from "./lib/configs/database";
export const fetchCache = "force-no-store";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Customer Data Mgmt",
  description: "Customer Data MGMT - next app",
};

connectDB();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
