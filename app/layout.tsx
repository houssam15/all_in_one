import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "../components/sideNar";
import Main from "../components/main";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "All in one",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className=" flex ">
          <SideBar/>
          <Main children={children}  />
      </div>
  </body>
    </html>
  );
}
