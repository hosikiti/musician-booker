import MusicianList from '@/app/musicians/MusicianList';
import RecentBookedSessionList from '@/app/musicians/RecentBookedSessionList';
import { getMusicians } from '@/lib/apiClient/musicians/getMusicians';
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query';

export default async function MusiciansPage() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['fetchMusicians'],
        queryFn: getMusicians,
        retry: 1, // this is required to render the page correctly on the server
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <section className="w-full md:w-[800px] px-8 flex flex-col h-[calc(100vh-64px)] justify-between items-stretch">
                <div>
                    <div className="my-8 flex flex-col gap-4">
                        <h1 className="text-2xl font-bold text-accent-content">
                            Musician Booking Platform
                        </h1>
                        <h2 className="text-neutral">Select a musician</h2>
                    </div>
                    <MusicianList></MusicianList>
                </div>
                <div className="py-8">
                    <h2 className="font-bold">
                        Recent 5 Sessions booked by people
                    </h2>
                    <RecentBookedSessionList></RecentBookedSessionList>
                </div>
            </section>
        </HydrationBoundary>
    );
}
