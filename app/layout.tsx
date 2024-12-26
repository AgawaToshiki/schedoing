import type { Metadata } from "next";
import { Noto_Sans_JP } from 'next/font/google';
import "./globals.css";
import { ToastProvider } from './context/ToastContext';

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  title: "Schedoing | スケジュール共有アプリ"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable } font-sans`}>
      <body className="m-0 p-0 box-border text-base text-gray-800">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
