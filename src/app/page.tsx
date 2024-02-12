import MainLayout from '@/layouts/MainLayouts';
import MusiciansPage from './musicians/page';

export default function Home() {
    return (
        <MainLayout>
            <MusiciansPage></MusiciansPage>
        </MainLayout>
    );
}
