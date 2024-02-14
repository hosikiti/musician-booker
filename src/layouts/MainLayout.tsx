'use client';
import Header from '@/components/header/Header';
import { Toaster } from 'react-hot-toast';

type MainLayoutProps = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="h-full flex flex-col w-full items-center">
            <Header />
            <div className=" flex justify-center">{children}</div>
            <Toaster />
        </div>
    );
}
