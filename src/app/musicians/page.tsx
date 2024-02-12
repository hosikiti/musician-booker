import MusicianList from '@/app/musicians/MusicianList';

export default function MusiciansPage() {
    return (
        <section className="px-8 flex flex-col h-full justify-center">
            <div className="my-8 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">
                    Musician Booking Platform
                </h1>
                <h2>Select a musician</h2>
            </div>
            <MusicianList></MusicianList>
        </section>
    );
}
