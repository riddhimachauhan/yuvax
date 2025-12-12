
import React from 'react';
import { Inter } from 'next/font/google';
import '../../../src/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen shadow-none ">
          {children}
        </main>
      </body>
    </html>
  );
}
