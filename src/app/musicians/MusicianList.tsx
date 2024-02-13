'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import MusicianCard from './MusicianCard';
import { useState } from 'react';
import BookingFormDrawer from './BookingFormDrawer';
import { Musician } from '@/types/musicians';
import { getMusicians } from '@/lib/apiClient/musicians/getMusicians';
import { PostBookingRequest } from '@/app/api/bookings/route';
import { postBooking } from '@/lib/apiClient/bookings/postBooking';
import { BookingFormValues } from '@/app/musicians/BookingForm';

export default function MusicianList() {
    const [selectedMusician, setSelectedMusician] = useState<
        Musician | undefined
    >(undefined);
    const { data, isLoading, isError } = useQuery({
        queryKey: ['fetchMusicians'],
        queryFn: getMusicians,
    });

    const postBookingMutation = useMutation<void>({
        mutationFn: async () => {
            await postBooking({
                musicianId: selectedMusician?.id,
                userName: 'test user',
                requestService: selectedMusician?.services[0].name,
                bookedDate: new Date().toISOString(),
            } as PostBookingRequest);
        },
    });

    const handleBookSession = (data: BookingFormValues) => {
        postBookingMutation.mutate();
    };

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
                musician={selectedMusician}
                onClose={() => setSelectedMusician(undefined)}
                onSubmit={handleBookSession}
            ></BookingFormDrawer>
        </>
    );
}
