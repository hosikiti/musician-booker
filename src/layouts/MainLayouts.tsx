import Header from '@/components/Header/Header';

type MainLayoutProps = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="h-full flex flex-col w-full ">
            <Header />
            {children}
        </div>
    );
}
