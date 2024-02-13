import MainLayout from '@/layouts/MainLayout';
import MusiciansPage from './musicians/page';

export default function Home() {
    return (
        <MainLayout>
            <MusiciansPage></MusiciansPage>
        </MainLayout>
    );
}
