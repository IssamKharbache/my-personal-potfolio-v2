import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar/Navbar";
import { norriex } from "@/lib/fonts";
import LoadingScreen from "@/components/loadingscreen/LoadingScreen";

const roboto = Roboto({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Issam Kharbache",
  description:
    "Hey my name is Issam and I'm a full stack developer with a passion for both front and back end development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        norriex.variable,
        "font-sans",
        roboto.variable,
      )}
    >
      <body>
        <LoadingScreen>
          <Navbar />
          <div>{children}</div>
        </LoadingScreen>
      </body>
    </html>
  );
}
