import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { IHaveChildren } from "@/types";
import ToasterContext from "@/contexts/ToasterContext";
import AuthContext from "@/contexts/AuthContext";
import ActiveStatus from "@/components/ActiveStatus";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Messenger Clone",
  description: "Messenger Clone",
};

interface RootLayoutProps extends IHaveChildren {}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
