import MusicianList from './MusicianList';

export default function MusiciansPage() {
    return (
        <section className="p-8 flex flex-col h-full justify-center">
            <h1 className="text-5xl">Musician Booking Platform</h1>
            <h2>Select a musician</h2>
            <MusicianList></MusicianList>
        </section>
    );
}
