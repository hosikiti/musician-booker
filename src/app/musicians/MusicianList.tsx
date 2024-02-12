'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Musician, MusiciansResponse } from '../api/musicians/route';
import MusicianCard from './MusicianCard';
import { useState } from 'react';

const fetchMusicians = async () => {
    return axios
        .get<MusiciansResponse>('/api/musicians')
        .then((res) => res.data);
};

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
        queryFn: fetchMusicians,
    });

    const handleBookSession = () => {
        console.log('book session');
    };

    if (isLoading) {
        return <div>loading</div>;
    }

    if (isError) {
        return <div>error!</div>;
    }

    return (
        <div className="flex flex-row">
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

            {selectedMusician && (
                <div className="bg-white shadow-md p-8 flex flex-col gap-4">
                    <div>
                        <span>What&apos;s your name?</span>
                    </div>
                    <button onClick={handleBookSession}>Book Session</button>
                </div>
            )}
        </div>
    );
}
