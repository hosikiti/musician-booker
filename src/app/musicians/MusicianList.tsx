'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import MusicianCard from './MusicianCard';
import { useState } from 'react';
import BookingFormDrawer from './BookingFormDrawer';
import { Musician } from '@/types/musicians';
import { getMusicians } from '@/lib/apiClient/musicians/getMusicians';
import { PostBookingRequest } from '@/app/api/bookings/route';
import { postBooking } from '@/lib/apiClient/bookings/postBooking';
import { BookingFormValues } from '@/app/musicians/BookingForm';
import BookingCompletedDrawer from '@/app/musicians/BookingCompletedDrawer';
import LoadingSpinner from '@/components/loading/LoadingSpinner';

export default function MusicianList() {
    const [selectedMusician, setSelectedMusician] = useState<
        Musician | undefined
    >(undefined);
    const [bookCompleted, setBookCompleted] = useState(false);
    const { data, isLoading, isError } = useQuery({
        queryKey: ['fetchMusicians'],
        queryFn: getMusicians,
    });
    const queryClient = useQueryClient();

    const postBookingMutation = useMutation<
        void,
        AxiosError,
        BookingFormValues
    >({
        mutationFn: async (data: BookingFormValues) => {
            await postBooking({
                musicianId: data.musicianId,
                userName: data.userName,
                requestService: data.service,
                bookedDate: data.date,
            });
        },
        onSuccess: () => {
            setSelectedMusician(undefined);
            setBookCompleted(true);
            queryClient.invalidateQueries({ queryKey: ['getRecentBookings'] });
        },
        onError: (error) => {
            // TODO
        },
    });

    const handleBookSession = (formData: BookingFormValues) => {
        postBookingMutation.mutate(formData);
    };

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    if (isError) {
        return <div>error!</div>;
    }

    return (
        <>
            <div className="flex flex-wrap gap-8 items-start">
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

            <BookingCompletedDrawer
                enabled={bookCompleted}
                onClose={() => setBookCompleted(false)}
            ></BookingCompletedDrawer>
        </>
    );
}
