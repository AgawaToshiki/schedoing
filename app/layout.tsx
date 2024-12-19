import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from './context/ToastContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Schedoing | スケジュール共有アプリ"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} m-0 p-0 box-border text-base text-gray-800`}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
