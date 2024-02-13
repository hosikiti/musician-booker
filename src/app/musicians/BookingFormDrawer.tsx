import { MusicianAvailabilityResponse } from '@/app/api/musicians/[id]/availability/route';
import BookingForm, { BookingFormValues } from '@/app/musicians/BookingForm';
import NotAvailableForm from '@/app/musicians/NotAvailableForm';
import Drawer from '@/components/drawer/Drawer';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import { getMusicianAvailability } from '@/lib/apiClient/availability/getMusicianAvailability';
import { Musician } from '@/types';
import { useQueries, useQuery } from '@tanstack/react-query';

type BookingFormDrawerProps = {
    musician?: Musician;
    onSubmit: (data: BookingFormValues) => void;
    onClose?: () => void;
};

export default function BookingFormDrawer({
    musician,
    onClose,
    onSubmit,
}: BookingFormDrawerProps) {
    const { data: availability, isLoading } = useQuery({
        queryKey: ['fetchMusicianAvailability', musician?.id],
        queryFn: () => {
            return getMusicianAvailability(musician!.id);
        },
        enabled: !!musician,
    });

    const buildContents = (
        musician?: Musician,
        availability?: MusicianAvailabilityResponse
    ) => {
        if (!musician) return null;
        if (isLoading) {
            return <LoadingSpinner />;
        }
        if (availability) {
            if (availability.availableDates.length > 0) {
                return (
                    <BookingForm
                        musician={musician}
                        availableDates={availability.availableDates}
                        onSubmit={onSubmit}
                    />
                );
            } else {
                return (
                    <NotAvailableForm
                        musicianName={musician.name}
                        onClose={onClose}
                    />
                );
            }
        }
        return null;
    };

    return (
        <Drawer id="booking-form-drawer" enabled={!!musician} onClose={onClose}>
            {buildContents(musician, availability)}
        </Drawer>
    );
}
