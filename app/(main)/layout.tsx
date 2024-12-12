import React from 'react';
import Header from "../components/layouts/Header";


export default function HeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <div className="flex min-h-dvh">
      <Header />
      <div className="flex flex-col w-full p-6 bg-blue-100 overflow-x-auto max-md:p-4">
        {children}
      </div>
    </div>
    </>
  );
}