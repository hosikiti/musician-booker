import Header from '@/components/header/Header';

type MainLayoutProps = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="h-full flex flex-col w-full">
            <Header />
            <div className="w-full flex justify-center">{children}</div>
        </div>
    );
}
