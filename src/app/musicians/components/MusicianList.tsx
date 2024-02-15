'use client';
import { useQuery } from '@tanstack/react-query';
import MusicianCard, { MemoMusicianCard } from './MusicianCard';
import { useState } from 'react';
import BookingFormDrawer from './BookingFormDrawer';
import { Musician } from '@/types';
import { getMusicians } from '@/lib/apiClient/musicians/getMusicians';
import { BookingFormValues } from '@/app/musicians/components/BookingForm';
import BookingCompletedDrawer from '@/app/musicians/components/BookingCompletedDrawer';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import Alert from '@/components/alert/Alert';
import { usePostBookingMutation } from '@/app/musicians/hooks/usePostBookingMutation';

export default function MusicianList() {
    const [selectedMusician, setSelectedMusician] = useState<
        Musician | undefined
    >(undefined);
    const [bookCompleted, setBookCompleted] = useState(false);
    const { data, isLoading, isError } = useQuery({
        queryKey: ['fetchMusicians'],
        queryFn: getMusicians,
    });

    const postBookingMutation = usePostBookingMutation({
        musicianId: selectedMusician?.id,
        onSuccess: () => {
            setSelectedMusician(undefined);
            setBookCompleted(true);
        },
    });

    const handleBookSession = (formData: BookingFormValues) => {
        postBookingMutation.mutate(formData);
    };

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    if (isError) {
        return <Alert type="error">Failed to loading data</Alert>;
    }

    return (
        <>
            <div className="flex flex-wrap gap-8 items-start">
                {data?.result.map((musician) => (
                    <MemoMusicianCard
                        key={musician.id}
                        musician={musician}
                        onClick={() => {
                            setSelectedMusician(musician);
                        }}
                    ></MemoMusicianCard>
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
