import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

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


export const metadata: Metadata = {
  title: "Form generated",
  description: "Form generated",
  icons: {
    icon: "/icon.svg",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-gray-100`}
      >
        <header className="bg-gray-800 text-white py-4 shadow-md">
          <div className="container mx-auto px-4 flex justify-between items-center">

            <div className="text-lg font-semibold">
              <Link href="/" className="text-white hover:text-gray-400"> <Image src="/icons/form.svg" alt="Login Icon" width={24} height={24} /></Link>
            </div>

            <nav className="space-x-6">
              <Link href="/" className="text-sm hover:text-gray-400">Home</Link>
              <Link href="/about" className="text-sm hover:text-gray-400">About</Link>
              <Link href="/contact" className="text-sm hover:text-gray-400">Contact</Link>
            </nav>

            <div>
              <Link
                href="/login"
                className="px-4 py-2 sm:bg-sky-500/50 text-white rounded-md text-sm hover:bg-gray-400 sm:flex items-center gap-2 flex"
              >
                <Image src="/icons/login.svg" alt="Login Icon" width={24} height={24} />
                <span className="hidden sm:flex">Sign In</span>
              </Link>
            </div>
          </div>
        </header>
        <main className="flex flex-col gap-8 row-start-2 items-center mt-16 flex-grow">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-6 mt-16">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-lg font-semibold">
              <Link href="/" className="text-white hover:text-gray-400 flex gap-2"> <Image src="/icons/form.svg" alt="Login Icon" width={24} height={24} />FormApp</Link>
            </div>
            <div className="flex space-x-6">
              <Link href="https://facebook.com">
                <Image src="/icons/facebook.svg" alt="Facebook" width={24} height={24} className="hover:opacity-80" />
              </Link>
              <Link href="https://linkedin.com">
                <Image src="/icons/linkedin.svg" alt="Twitter" width={24} height={24} className="hover:opacity-80" />
              </Link>
              <Link href="https://instagram.com">
                <Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} className="hover:opacity-80" />
              </Link>
            </div>
            <div className="text-sm text-gray-400">
              &copy; 2024 FormApp. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
