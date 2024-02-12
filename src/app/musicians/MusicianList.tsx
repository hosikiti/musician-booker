'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import MusicianCard from './MusicianCard';
import { useState } from 'react';
import BookingFormDrawer from './BookingFormDrawer';
import { Musician } from '@/types/musicians';
import { getMusicians } from '@/lib/api/musicians/getMusicians';

const createBooking = async (musicianId: number, name: string) => {
    return axios.post('/api/bookings', {
        musicianId,
        name,
    });
};

export default function MusicianList() {
    const [selectedMusician, setSelectedMusician] = useState<
        Musician | undefined
    >(undefined);
    const { data, isLoading, isError } = useQuery({
        queryKey: ['fetchMusicians'],
        queryFn: getMusicians,
    });

    const handleBookSession = () => {};

    if (isLoading) {
        return <div>loading</div>;
    }

    if (isError) {
        return <div>error!</div>;
    }

    return (
        <>
            <div className="flex flex-wrap gap-8">
                {data?.result.map((musician) => (
                    <MusicianCard
                        key={musician.id}
                        musician={musician}
                        onClick={() => {
                            setSelectedMusician(musician);
                        }}
                    ></MusicianCard>
                ))}
            </div>

            <BookingFormDrawer
                enabled={!!selectedMusician}
                onClose={() => setSelectedMusician(undefined)}
            ></BookingFormDrawer>
        </>
    );
}
