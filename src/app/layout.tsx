import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ReactQueryProvider from '@/providers/Providers';
import Providers from '@/providers/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Musician Booker',
    description: 'Collaborate with top-notch musicians for your desires',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="text-base-content">
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
